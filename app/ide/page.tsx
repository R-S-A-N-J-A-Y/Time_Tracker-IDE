"use client";
import { Editor } from "@monaco-editor/react";
import debounce from "lodash/debounce";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

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
    <div className="flex flex-col gap-3 p-3 h-screen w-screen">
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
          {!isLoading ? (
            "Run"
          ) : (
            <svg
              aria-hidden="true"
              className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-300 fill-gray-100"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

// Editor Setup
interface LanguageDropdownProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageDropdown = ({ language, setLanguage }: LanguageDropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative inline-block border rounded-lg bg-white px-3 py-2">
      <button
        className="text-gray-900 flex px-1 justify-between items-center cursor-pointer w-24"
        onClick={() => setOpen(!open)}
      >
        {language.charAt(0).toUpperCase()}
        {language.slice(1)}
        <svg
          className="-mr-1 size-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute bg-white rounded-lg z-1 left-0 top-11 w-full p-4 flex flex-col gap-2">
          <button
            className="cursor-pointer w-full text-gray-900 text-start"
            onClick={() => {
              setLanguage("python");
              setOpen(!open);
            }}
          >
            Python
          </button>
          <button
            className="cursor-pointer w-full text-gray-900 text-start"
            onClick={() => {
              setLanguage("cpp");
              setOpen(!open);
            }}
          >
            {" "}
            C / C++
          </button>
          <button
            className="cursor-pointer w-full text-gray-900 text-start"
            onClick={() => {
              setLanguage("java");
              setOpen(!open);
            }}
          >
            Java
          </button>
          <button
            className="cursor-pointer w-full text-gray-900 text-start"
            onClick={() => {
              setLanguage("javascript");
              setOpen(!open);
            }}
          >
            Javascript
          </button>
        </div>
      )}
    </div>
  );
};

interface EditorProps {
  setCode: (data: string) => void;
  language: string;
  setLanguage: (data: string) => void;
}

const EditorWrapper = ({ setCode, language, setLanguage }: EditorProps) => {
  const debouncedOnchange = useMemo(
    () =>
      debounce((value: string | undefined) => {
        if (value) setCode(value);
      }, 800),
    [setCode]
  );

  const HandleOnChange = (data: string | undefined) => {
    debouncedOnchange(data);
  };

  useEffect(() => {
    return debouncedOnchange.cancel();
  }, [debouncedOnchange]);

  return (
    <div
      className="flex-2 p-5 flex flex-col gap-7 border-2 rounded-xl"
      style={{ backgroundColor: "#1e1e1e" }}
    >
      <div className="flex w-full justify-end px-5">
        <LanguageDropdown language={language} setLanguage={setLanguage} />
      </div>

      <Editor
        className="flex-1"
        height="100%"
        defaultLanguage="python"
        language={language}
        theme="vs-dark"
        options={{
          fontSize: 20,
          minimap: { enabled: false },
        }}
        onChange={HandleOnChange}
      />
    </div>
  );
};

// Input Field

interface InputProps {
  setInput: (data: string) => void;
}

const InputSection = ({ setInput }: InputProps) => {
  const debouncedOnchange = useMemo(
    () =>
      debounce((value: string | undefined) => {
        if (value) setInput(value);
      }, 800),
    [setInput]
  );

  const HandleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target) {
      debouncedOnchange(e.target.value);
    }
  };

  return (
    <div
      className="flex-1 flex flex-col rounded-xl p-5 gap-4"
      style={{ backgroundColor: "#1e1e1e" }}
    >
      <h3 className="text-white text-xl font-bold">Input</h3>
      <textarea
        className="flex-1 p-3 text-white"
        style={{ outline: "none", resize: "none" }}
        onChange={HandleOnChange}
      />
    </div>
  );
};

// Output Field

interface OutputProps {
  output: string;
  executionTime: string;
}
const OutputSection = ({ output, executionTime }: OutputProps) => {
  return (
    <div
      className="flex-1 flex flex-col rounded-xl p-5 gap-4"
      style={{ backgroundColor: "#1e1e1e" }}
    >
      <h3 className="text-white text-xl font-bold">Output</h3>
      <textarea
        className="flex-1 p-3 text-white"
        value={output}
        style={{ outline: "none", resize: "none" }}
        disabled
      />
      {executionTime && (
        <p className="text-white text-xl font-bold">
          Execution Time: {executionTime}s
        </p>
      )}
    </div>
  );
};
