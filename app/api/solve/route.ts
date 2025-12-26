import { getVercelOidcToken } from "@vercel/oidc";
import { ExternalAccountClient } from "google-auth-library";
import { NextResponse } from "next/server";

// --- Configuration ---
const GCP_PROJECT_NUMBER = process.env.GCP_PROJECT_NUMBER;
const GCP_SERVICE_ACCOUNT_EMAIL = process.env.GCP_SERVICE_ACCOUNT_EMAIL;
const GCP_WORKLOAD_IDENTITY_POOL_ID = process.env.GCP_WORKLOAD_IDENTITY_POOL_ID;
const GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID =
  process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID;

const targetBaseUrl =
  "https://rosette-solver-157013217208.europe-west1.run.app";

// Function to create and return the initialized client
const createAuthClient = () => {
  return ExternalAccountClient.fromJSON({
    type: "external_account",
    audience: `//iam.googleapis.com/projects/${GCP_PROJECT_NUMBER}/locations/global/workloadIdentityPools/${GCP_WORKLOAD_IDENTITY_POOL_ID}/providers/${GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID}`,
    subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
    token_url: "https://sts.googleapis.com/v1/token",
    service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${GCP_SERVICE_ACCOUNT_EMAIL}:generateAccessToken`,
    subject_token_supplier: {
      getSubjectToken: getVercelOidcToken,
    },
  });
};

// Export the route handler
export const GET = async (request: Request) => {
  try {
    const authClient = createAuthClient();
    const url = new URL(request.url);
    const prefix = url.searchParams.get("prefix");
    const targetUrl = `${targetBaseUrl}?prefix=${encodeURIComponent(
      prefix ?? "",
    )}`;

    // 1. Get the initial Access Token (this is working)
    if (!authClient) {
      return;
    }
    const credentials = await authClient.getAccessToken();

    const accessToken = credentials.token;

    if (!accessToken) {
      throw new Error("Failed to obtain access token.");
    }

    // --- CORRECTED STEP: Exchange Access Token for an ID Token using the STS API ---
    // We use the STS endpoint here, which is the correct one for Workload Identity/Impersonation flows.
    const STS_ENDPOINT = `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${GCP_SERVICE_ACCOUNT_EMAIL}:generateIdToken`;
    // The ID Token is obtained by calling the generateIdToken method on the service account.
    const idTokenResponse = await fetch(STS_ENDPOINT, {
      method: "POST",
      headers: {
        // Use the Access Token to authorize this call
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // The audience must be the base URL of the Cloud Run service.
        audience: targetBaseUrl,
        // Setting this to true includes email/user-id info in the token payload
        includeEmail: true,
      }),
    });

    if (!idTokenResponse.ok) {
      const errorText = await idTokenResponse.text();
      throw new Error(
        `Failed to get ID Token: ${idTokenResponse.status} - ${errorText}`,
      );
    }

    const idTokenData = await idTokenResponse.json();
    // The ID Token is returned under the 'token' key in this specific API response
    const idToken = idTokenData.token;

    if (!idToken) {
      throw new Error("ID Token not found in response.");
    }

    // 2. Make the authenticated request using the ID Token
    const res = await fetch(targetUrl, {
      headers: {
        // Use the ID Token here
        Authorization: `Bearer ${idToken}`,
      },
      redirect: "follow",
    });

    // ... (rest of the response handling)
    if (!res.ok) {
      console.error(`Cloud Run request failed with status: ${res.status}`);
      const errorText = await res.text();
      return NextResponse.json(
        { error: "Cloud Run call failed", details: errorText },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json({ data: data });
  } catch (error) {
    console.error("Cloud Run call failed:", error);
    return NextResponse.json({ error: "Call failed" }, { status: 500 });
  }
};
