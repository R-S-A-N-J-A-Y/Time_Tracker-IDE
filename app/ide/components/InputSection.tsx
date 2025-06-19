import debounce from "lodash/debounce";
import { ChangeEvent, useMemo } from "react";

interface InputProps {
  setInput: (data: string) => void;
}

export const InputSection = ({ setInput }: InputProps) => {
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
