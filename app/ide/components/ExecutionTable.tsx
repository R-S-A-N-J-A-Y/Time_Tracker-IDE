import { useEffect, useState } from "react";
import { ExecutionRecord } from "../page";
import { LanguageDropdown } from "./LanguageDropdown";

interface Props {
  history: ExecutionRecord[];
  clearHistory: () => void;
}

export const ExecutionTable = ({ history, clearHistory }: Props) => {
  const [filterByLanguage, setFilterByLanguage] = useState("");
  const [filteredHistory, setFilteredHistory] = useState<ExecutionRecord[]>([]);

  useEffect(() => {
    if (!filterByLanguage) {
      setFilteredHistory(history);
    } else {
      setFilteredHistory(
        history.filter((row) => row.language === filterByLanguage)
      );
    }
  }, [filterByLanguage, history]);

  return (
    <div className="bg-white rounded-xl mb-5 p-4 w-full flex flex-col gap-5">
      <div className="flex items-center gap-6">
        <h2 className="text-2xl inline font-bold text-black">
          Execution Summary
        </h2>
        <LanguageDropdown
          name="table"
          language={filterByLanguage}
          setLanguage={setFilterByLanguage}
        />
      </div>
      {filteredHistory.length > 0 ? (
        <div>
          <button
            className="border font-bold text-red-500 px-3 py-2 rounded-xl cursor-pointer transform transition hover:-translate-y-1"
            onClick={clearHistory}
          >
            Clear History
          </button>
        </div>
      ) : (
        ""
      )}
      {filteredHistory.length > 0 ? (
        <table className="w-full table-auto border-collapse text-black">
          <thead>
            <tr>
              <th className="border-2 px-4 py-2">Runs</th>
              <th className="border-2 px-4 py-2">Time (s)</th>
              <th className="border-2 px-4 py-2">Language</th>
              <th className="border-2 px-4 py-2">Timestamp</th>
              <th className="border-2 px-4 py-2">Code</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((entry, idx) => (
              <tr key={idx} className="text-center">
                <td className="border px-4 py-2">{idx + 1}</td>
                <td className="border px-4 py-2">{entry.time}</td>
                <td className="border px-4 py-2 capitalize">
                  {entry.language}
                </td>
                <td className="border px-4 py-2">{entry.timestamp}</td>
                <th className="border px-4 py-2">
                  <button className="border cursor-pointer rounded-xl px-4 py-2">
                    View
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Data to show.</p>
      )}
    </div>
  );
};
