"use client";
import { useEffect, useState } from "react";
import { EditorLayout } from "./components/EditorLayout";
import { ExecutionTimeChart } from "./components/ExecutionTimeChart";
import { ExecutionTable } from "./components/ExecutionTable";

export type ExecutionRecord = {
  time: string;
  code: string;
  input: string;
  timestamp: string;
  language: string;
};

export default function EditorPage() {
  const [executionHistory, setExecutionHistory] = useState<ExecutionRecord[]>(
    []
  );
  const [showTime, setShowTime] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const history = localStorage.getItem("history");
      if (history) return setExecutionHistory(JSON.parse(history));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("history", JSON.stringify(executionHistory));
    }
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
