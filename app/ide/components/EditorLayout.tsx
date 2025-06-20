import { useState } from "react";
import { EditorWrapper } from "./Editor";
import { InputSection } from "./InputSection";
import { Loader } from "./Loader";
import { OutputSection } from "./OutputSection";
import { ExecutionRecord } from "../page";

interface Props {
  setExecutionHistory: React.Dispatch<React.SetStateAction<ExecutionRecord[]>>;
  setShowTime: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditorLayout = ({ setExecutionHistory, setShowTime }: Props) => {
  const [language, setLanguage] = useState<string>("python");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [executionTime, setExecutionTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRun = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        body: JSON.stringify({ code, input, language }),
      });
      const data = await res.json();
      setOutput(data.stdout || data.stderr || data.compile_output);
      setExecutionTime(data.time);
      console.log(data);
      setExecutionHistory((prev) => [
        ...prev,
        {
          code: code,
          input: input,
          language: language,
          time: data.time,
          timestamp: new Date().toLocaleTimeString(), // or Date.now()
        },
      ]);
    } catch (err) {
      console.log(err);
      setOutput("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-3">
      <div className="flex justify-end gap-5">
        <button
          className="bg-linear-to-r from-sky-400 to-indigo-500 cursor-pointer px-7 py-2 text-xl text-white rounded-lg"
          onClick={handleRun}
        >
          {!isLoading ? "Run" : <Loader />}
        </button>
        <button
          className="bg-gray-700 cursor-pointer px-7 py-2 text-xl text-white rounded-lg"
          onClick={() => setShowTime((prev) => !prev)}
        >
          Time
        </button>
      </div>
      <section className="flex gap-10 flex-1">
        <EditorWrapper
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
        />
        <section className="flex flex-col gap-4 flex-1">
          <InputSection setInput={setInput} />
          <OutputSection output={output} executionTime={executionTime} />
        </section>
      </section>
    </div>
  );
};
