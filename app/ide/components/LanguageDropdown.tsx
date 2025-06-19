import { useState } from "react";

interface LanguageDropdownProps {
  language: string;
  setLanguage: (lang: string) => void;
}

export const LanguageDropdown = ({
  language,
  setLanguage,
}: LanguageDropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative inline-block border rounded-lg bg-white px-3 py-2">
      <button
        className="text-gray-900 flex px-1 justify-between items-center cursor-pointer w-24"
        onClick={() => setOpen(!open)}
      >
        {!language
          ? "All"
          : language.charAt(0).toUpperCase() + language.slice(1)}
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
              setLanguage("");
              setOpen(!open);
            }}
          >
            All
          </button>
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
