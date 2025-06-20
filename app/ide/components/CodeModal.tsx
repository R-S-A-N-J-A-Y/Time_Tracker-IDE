import { ImCross } from "react-icons/im";
import { ExecutionRecord } from "../page";

interface Props {
  ToggleShowModal: (data: ExecutionRecord | null) => void;
  currExecution: ExecutionRecord;
}

const Headings = ["Code", "Input", "Output"];

const CodeModal = ({ ToggleShowModal, currExecution }: Props) => {
  const CurrExecution = [
    currExecution.code,
    currExecution.input,
    currExecution.output,
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/50">
      <div className="relative bg-white text-black border rounded-xl p-10 w-[60%] max-h-[90vh] overflow-auto modal-scroll-hide flex flex-col gap-5">
        <div className="flex justify-end">
          <ImCross
            size={25}
            className="cursor-pointer"
            onClick={() => ToggleShowModal(null)}
          />
        </div>

        <p className="font-bold text-xl">
          Language:{" "}
          {currExecution.language.charAt(0).toUpperCase() +
            currExecution.language.slice(1)}
        </p>
        {CurrExecution.map((data, idx) =>
          data ? (
            <div key={idx} className="flex flex-col gap-4">
              <p className="text-xl font-bold">{Headings[idx]}</p>
              <pre
                className={`${
                  currExecution.isError ? "border-2 border-red-400" : "border"
                } rounded-xl p-5 max-h-64 overflow-auto whitespace-pre-wrap modal-scroll-hide`}
              >
                <code>{data}</code>
              </pre>
            </div>
          ) : (
            ""
          )
        )}
        <p className="font-bold text-xl">
          Execution Time: {currExecution.time}s
        </p>
      </div>
    </div>
  );
};

export default CodeModal;
