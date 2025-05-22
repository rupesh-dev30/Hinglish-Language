export default function Update() {
  return (
    <div className="container mx-auto w-full min-h-screen p-6 flex flex-col items-center justify-center space-y-8">
      <h1 className="text-4xl font-bold mb-4">
        Hinglish Programming Language Update
      </h1>

      <section className="max-w-3xl w-full bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-3">Current Features</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          <li>
            Variable declaration (e.g., <code>variable banana x = 10</code>)
          </li>
          <li>String concatenation</li>
          <li>
            Arithmetic operations: addition, subtraction, multiplication,
            division
          </li>
          <li>
            Print statements (e.g., <code>print karo "Hello World"</code>)
          </li>
          <li>Variable assignment and updating values</li>
        </ul>
      </section>

      <section className="max-w-3xl w-full bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-3">Coming Soon</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-600 italic">
          <li>Loops (for, while)</li>
          <li>If-Else conditional statements</li>
          <li>Break and Continue statements</li>
          <li>Functions and more advanced control flow</li>
          <li>Dark Mode</li>
        </ul>
      </section>

      <section className="max-w-3xl w-full text-center text-gray-700">
        <p>
          If you love to contribute or want to help improve Hinglish language,
          check out the{" "}
          <a
            href="https://github.com/rupesh-dev30/Hinglish-Language"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            GitHub repository
          </a>
          .
        </p>
      </section>
    </div>
  );
}
