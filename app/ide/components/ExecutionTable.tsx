import { useEffect, useState } from "react";
import { ExecutionRecord } from "../page";
import { LanguageDropdown } from "./LanguageDropdown";

interface Props {
  history: ExecutionRecord[];
}

export const ExecutionTable = ({ history }: Props) => {
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

  //   console.log(s)

  return (
    <div className="bg-white rounded-xl mb-5 p-4 w-full">
      <div className="flex items-center gap-6 mb-10">
        <h2 className="text-xl inline font-bold text-black">
          Execution Summary
        </h2>
        <LanguageDropdown
          language={filterByLanguage}
          setLanguage={setFilterByLanguage}
        />
      </div>
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
