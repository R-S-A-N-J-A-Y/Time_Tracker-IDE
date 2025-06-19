interface OutputProps {
  output: string;
  executionTime: string;
}

export const OutputSection = ({ output, executionTime }: OutputProps) => {
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
