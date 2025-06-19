"use client";
import { useState } from "react";
import { EditorLayout } from "./components/EditorLayout";
import { ExecutionTimeChart } from "./components/ExecutionTimeChart";
import { ExecutionTable } from "./components/ExecutionTable";

export type ExecutionRecord = {
  time: string;
  timestamp: string;
  language: string;
};

export default function EditorPage() {
  const [executionHistory, setExecutionHistory] = useState<ExecutionRecord[]>(
    []
  );
  const [showTime, setShowTime] = useState(false);

  return (
    <div className="flex flex-col gap-5 min-h-screen px-10 py-3">
      <EditorLayout
        setExecutionHistory={setExecutionHistory}
        setShowTime={setShowTime}
      />
      {showTime && <ExecutionTimeChart history={executionHistory} />}
      {showTime && <ExecutionTable history={executionHistory} />}
    </div>
  );
}
