import { useHinglish } from "@/context/HinglishContext";
import { examplePrograms } from "@/interpreter/examples";
import { Lightbulb } from "lucide-react";

export default function ExamplePanel() {
  const { setCode } = useHinglish();

  const loadExample = (code: string) => {
    setCode(code);
  };

  return (
    <div className="mt-4 bg-white rounded-xl shadow-md">
      <div className="bg-gray-800 text-white px-6 py-3 flex items-center rounded-t-xl">
        <Lightbulb className="h-5 w-5 mr-2" />
        <h2 className="font-semibold text-lg">Example Programs</h2>
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {examplePrograms.map((example, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col justify-between hover:shadow-sm transition-shadow"
          >
            <div>
              <h3 className="font-semibold text-base text-gray-800 mb-1">
                {example.title}
              </h3>
              <p className="text-sm text-gray-600">{example.description}</p>
            </div>

            <button
              onClick={() => loadExample(example.code)}
              className="mt-4 self-start text-blue-600 text-sm font-medium hover:underline"
            >
              Load Example
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
