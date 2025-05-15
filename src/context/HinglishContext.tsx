import { createContext, useContext, useState, type ReactNode } from "react";
import { interpretHinglish } from "../interpreter/interpreter";

interface HinglishContextType {
  code: string;
  setCode: (code: string) => void;
  output: string[];
  error: string | null;
  isExecuting: boolean;
  executeCode: () => void;
}

const HinglishContext = createContext<HinglishContextType | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useHinglish = (): HinglishContextType => {
  const context = useContext(HinglishContext);
  if (context === undefined) {
    throw new Error("useHinglish must be used within a HinglishProvider");
  }
  return context;
};

interface HinglishProviderProps {
  children: ReactNode;
}

export const HinglishProvider = ({ children }: HinglishProviderProps) => {
  const [code, setCode] = useState<string>(
    '// Type your Hinglish code here\n\n// Example:\nprint karo "Namaste Duniya!"'
  );
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const executeCode = async () => {
    setIsExecuting(true);
    setOutput([]);
    setError(null);

    try {
      const outputLines: string[] = [];
      const printFunction = (text: string) => {
        outputLines.push(text);
        setOutput([...outputLines]); // Update state immediately for each line
      };

      await interpretHinglish(code, printFunction);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Arrey bhai, error hai: ${err.message}`);
      } else {
        setError("Arrey bhai, pata nahi kya error hai!");
      }
    } finally {
      setIsExecuting(false);
    }
  };

  const value = {
    code,
    setCode,
    output,
    error,
    isExecuting,
    executeCode,
  };

  return (
    <HinglishContext.Provider value={value}>
      {children}
    </HinglishContext.Provider>
  );
};
