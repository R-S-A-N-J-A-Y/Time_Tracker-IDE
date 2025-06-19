import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  history: { time: string; timestamp: string }[];
}

export const ExecutionTimeChart = ({ history }: Props) => {
  const chartData = history.map((item, index) => ({
    name: `Run ${index + 1}`,
    time: parseFloat(item.time),
  }));

  return (
    <div className="bg-white rounded-xl p-4 w-full h-72">
      <h2 className="text-xl font-bold mb-10 text-black">
        Execution Time Graph
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid stroke="#eee" />
          <XAxis dataKey="name" />
          <YAxis
            label={{ value: "Time (s)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="time"
            stroke="#5779ff"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
