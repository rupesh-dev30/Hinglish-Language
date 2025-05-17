import { useHinglish } from "@/context/HinglishContext";
import { AlertCircle, Terminal } from "lucide-react";

export default function OutputPanel() {
  const { output, error, isExecuting } = useHinglish();

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full">
      <div className="bg-gray-800 text-white px-4 py-2 flex items-center">
        <Terminal className="h-5 w-5 mr-2" />
        <h2 className="font-medium">Output</h2>
        {isExecuting && (
          <div className="ml-auto flex items-center">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
            <span className="text-sm">Running...</span>
          </div>
        )}
      </div>
      <div className="p-4 min-h-[300px] bg-gray-900 text-white font-mono text-sm overflow-auto">
        {error ? (
          <div className="flex items-start text-red-400">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <pre className="whitespace-pre-wrap">{error}</pre>
          </div>
        ) : output.length > 0 ? (
          output.map((line, index) => (
            <div key={index} className="mb-1">
              <span className="text-green-400">&gt; </span>
              {line}
            </div>
          ))
        ) : (
          <div className="text-gray-500 italic">
            Output will appear here after you run your code...
          </div>
        )}
      </div>
    </div>
  );
}
