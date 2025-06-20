"use client";
import { useEffect, useState } from "react";
import { EditorLayout } from "./components/EditorLayout";
import { ExecutionTimeChart } from "./components/ExecutionTimeChart";
import { ExecutionTable } from "./components/ExecutionTable";
import CodeModal from "./components/CodeModal";

export type ExecutionRecord = {
  time: string;
  code: string;
  input: string;
  output: string;
  isError: boolean;
  timestamp: string;
  language: string;
};

export default function EditorPage() {
  const [executionHistory, setExecutionHistory] = useState<ExecutionRecord[]>(
    []
  );
  const [showTime, setShowTime] = useState(false);
  const [showModal, setShowModal] = useState<ExecutionRecord | null>(null);

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

  const ToggleShowModal = (data: ExecutionRecord | null) => {
    setShowModal(data);
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
          ToggleShowModal={ToggleShowModal}
        />
      )}
      {showTime && showModal && (
        <CodeModal
          currExecution={showModal}
          ToggleShowModal={ToggleShowModal}
        />
      )}
    </div>
  );
}
