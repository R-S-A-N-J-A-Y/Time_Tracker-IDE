"use client";
import { Editor } from "@monaco-editor/react";
import debounce from "lodash/debounce";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

export default function EditorPage() {
  const [language, setLanguage] = useState<string>("python");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleRun = async () => {
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        body: JSON.stringify({ code, input, language }),
      });
      const data = await res.json();
      setOutput(data.output || data.error);
    } catch (err) {
      console.log(err);
      setOutput("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col gap-3 p-3 h-screen w-screen flex-wrap">
      <section className="flex gap-3 flex-1">
        <EditorWrapper
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
        />
        <section className="flex flex-col gap-4 flex-1">
          <InputSection setInput={setInput} />
          <OutputSection output={output} />
        </section>
      </section>
      <div>
        <button
          className="bg-blue-600 cursor-pointer px-7 py-2 text-xl text-white rounded-lg"
          onClick={handleRun}
        >
          Run
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
}
const OutputSection = ({ output }: OutputProps) => {
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
    </div>
  );
};
