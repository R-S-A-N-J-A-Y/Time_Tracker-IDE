import { ExecutionRecord } from "../page";

interface Props {
  history: ExecutionRecord[];
}

export const ExecutionTable = ({ history }: Props) => {
  return (
    <div className="bg-white rounded-xl mb-5 p-4 w-full">
      <h2 className="text-xl font-bold mb-10 text-black">Execution Summary</h2>
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
          {history.map((entry, idx) => (
            <tr key={idx} className="text-center">
              <td className="border px-4 py-2">{idx + 1}</td>
              <td className="border px-4 py-2">{entry.time}</td>
              <td className="border px-4 py-2 capitalize">{entry.language}</td>
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
    </div>
  );
};
