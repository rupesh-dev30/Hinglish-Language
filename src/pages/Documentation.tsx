import { examplePrograms } from "@/interpreter/examples";

export default function Documentation() {
  return (
    <div className="container mx-auto w-full min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Hinglish Language Documentation
      </h1>

      {examplePrograms.map(({ title, description, code }, idx) => (
        <section
          key={idx}
          className="mb-10 p-6 border rounded-lg shadow-sm bg-white"
        >
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="mb-4 text-gray-700">{description}</p>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto whitespace-pre-wrap font-mono text-sm">
            {code}
          </pre>
        </section>
      ))}

      <footer className="text-center mt-12 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Hinglish Interpreter
      </footer>
    </div>
  );
}
