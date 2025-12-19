import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";

export default async function AutogramList() {
  const autograms = await prisma.autogram.findMany();
  
  return (
  <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
  <table className="w-full text-sm text-left rtl:text-right text-body">
  <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
    <tr>
      <th>Date Created</th>
      <th>Creator Name</th>
      <th>Prefix</th>
      <th>Connector</th>
      <th>Time Taken</th>
      <th>Autogram</th>
    </tr>
  </thead>
  <tbody>
    {autograms.map((autogram) => (
      <tr key={autogram.id}>
        <td>{new Date(autogram.createdAt).toLocaleDateString()}</td>
        <td>{autogram.name}</td>
        <td>{autogram.prefix}</td>
        <td>{autogram.zConnector}</td>
        <td>{autogram.time}</td>
        <td>{autogram.content}</td>
      </tr>
    ))}
  </tbody>
</table>
</div>
  );
}



/*
<tr>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
    <tr>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
    </tr>
    <tr>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
    </tr>

<div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Previously Found Autograms</h1>
      <ul className="space-y-4">
        {autograms.map((autogram) => (
          <li
            key={autogram.id}
            className="rounded-lg border bg-white p-4 shadow-sm"
          >
            <p className="text-gray-900">{autogram.content}</p>
            <p>{autogram.time}</p>
            <p>Created on{" "}
              {new Date(autogram.createdAt).toLocaleDateString()}
            </p>
            <p>{autogram.name}</p>
            <p>{autogram.prefix}</p>
            <p>{autogram.zConnector}</p>
          </li>
        ))}
      </ul>
    </div>







 */