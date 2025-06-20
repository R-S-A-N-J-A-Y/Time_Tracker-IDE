"use client";
import { useEffect, useState } from "react";
import { EditorLayout } from "./components/EditorLayout";
import { ExecutionTimeChart } from "./components/ExecutionTimeChart";
import { ExecutionTable } from "./components/ExecutionTable";

export type ExecutionRecord = {
  time: string;
  timestamp: string;
  language: string;
};

const GetInitialHistory = () => {
  const history = localStorage.getItem("history");
  if (history) return JSON.parse(history);
  return [];
};

export default function EditorPage() {
  const [executionHistory, setExecutionHistory] =
    useState<ExecutionRecord[]>(GetInitialHistory);
  const [showTime, setShowTime] = useState(false);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(executionHistory));
  }, [executionHistory]);

  const clearHistory = () => {
    setExecutionHistory([]);
  };

  return (
    <div className="flex flex-col gap-5 min-h-screen px-10 py-3">
      <EditorLayout
        setExecutionHistory={setExecutionHistory}
        setShowTime={setShowTime}
      />
      {showTime && executionHistory.length > 0 && (
        <ExecutionTimeChart history={executionHistory} />
      )}
      {showTime && (
        <ExecutionTable
          history={executionHistory}
          clearHistory={clearHistory}
        />
      )}
    </div>
  );
}
