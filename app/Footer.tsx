import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 text-gray-700 py-4 flex flex-col items-center space-y-4 border-t border-gray-200 mt-10">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Nels Martin
      </p>

      <div className="flex space-x-6">
        <a
          href="https://github.com/nelsmartin/pangram-website-vercel"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="GitHub"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/nelsmartin/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition-colors"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={20} />
        </a>
      </div>

      <p className="text-sm text-gray-500">
        Built with{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Next.js
        </a>
        ,{" "}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Tailwind CSS
        </a>
        ,{" "}
        <a
          href="https://www.docker.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Docker
        </a>
        , and{" "}
        <a
          href="https://docs.racket-lang.org/rosette-guide/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Rosette
        </a>
        .
      </p>
    </footer>
  );
}
