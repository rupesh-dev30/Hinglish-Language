import { useHinglish } from "@/context/HinglishContext";
import { examplePrograms } from "@/interpreter/examples";
import { Lightbulb } from "lucide-react";

export default function ExamplePanel() {
  const { setCode } = useHinglish();

  const loadExample = (code: string) => {
    setCode(code);
  };

  return (
    <div className="mt-4 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-800 text-white px-4 py-2 flex items-center">
        <Lightbulb className="h-5 w-5 mr-2" />
        <h2 className="font-medium">Example Programs</h2>
      </div>
      <div className="p-4 space-y-3">
        {examplePrograms.map((example, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md p-3 hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium text-lg mb-1">{example.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{example.description}</p>
            <button
              onClick={() => loadExample(example.code)}
              className="text-sm text-blue-500 hover:text-blue-700 transition-colors"
            >
              Load Example
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
