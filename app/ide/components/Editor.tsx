"use client";
import { Editor } from "@monaco-editor/react";
import debounce from "lodash/debounce";
import { useEffect, useMemo } from "react";
import { LanguageDropdown } from "./LanguageDropdown";

interface EditorProps {
  setCode: (data: string) => void;
  language: string;
  setLanguage: (data: string) => void;
}

export const EditorWrapper = ({
  setCode,
  language,
  setLanguage,
}: EditorProps) => {
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
