"use client";
import { EditorWrapper } from "@/components/Editor";
import { InputSection } from "@/components/InputSection";
import { Loader } from "@/components/Loader";
import { OutputSection } from "@/components/OutputSection";
import { useState } from "react";

export default function EditorPage() {
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
    } catch (err) {
      console.log(err);
      setOutput("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 p-3 min-h-screen">
        <section className="flex gap-3 flex-1">
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
        <div>
          <button
            className="bg-linear-to-r from-sky-400 to-indigo-500 cursor-pointer px-7 py-2 text-xl text-white rounded-lg"
            onClick={handleRun}
          >
            {!isLoading ? "Run" : <Loader />}
          </button>
        </div>
      </div>
    </>
  );
}
