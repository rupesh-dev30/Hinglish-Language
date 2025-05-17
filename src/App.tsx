import { Route, Routes } from "react-router";

import ExamplePanel from "./components/ExamplePanel";
import OutputPanel from "./components/OutputPanel";
import Documentation from "./pages/Documentation";
import Layout from "./components/Layout";
import { HinglishProvider } from "./context/HinglishContext";
import { CodeEditor } from "./components/CodeEditor";
import Example from "./pages/Example";

export default function App() {
  return (
    <HinglishProvider>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <div className="container mx-auto flex flex-col lg:flex-row w-full gap-4 p-4">
                <div className="w-full lg:w-1/2">
                  <CodeEditor />
                  <ExamplePanel />
                </div>

                <div className="w-full lg:w-1/2">
                  <OutputPanel />
                </div>
              </div>
            }
          />

          <Route path="/docs" element={<Documentation />} />
          <Route path="/example" element={<Example />} />
        </Routes>
      </Layout>
    </HinglishProvider>
  );
}
