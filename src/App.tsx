import { Route, Routes } from "react-router";
import Documentation from "./pages/Documentation";
import { HinglishProvider } from "./context/HinglishContext";
import Layout from "./components/Layout";
import { CodeEditor } from "./components/CodeEditor";
import OutputPanel from "./components/OutputPanel";
import ExamplePanel from "./components/ExamplePanel";
import Update from "./pages/Update";

export default function App() {
  return (
    <HinglishProvider>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <div className="container mx-auto p-4 space-y-6">
                <div className="flex flex-col lg:flex-row gap-6 w-full">
                  <div className="w-full lg:w-1/2">
                    <CodeEditor />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <OutputPanel />
                  </div>
                </div>

                {/* Example Panel full width below */}
                <div className="w-full">
                  <ExamplePanel />
                </div>
              </div>
            }
          />

          <Route path="/docs" element={<Documentation />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </Layout>
    </HinglishProvider>
  );
}
