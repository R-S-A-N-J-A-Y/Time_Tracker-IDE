"use client";
import { useState } from "react";
import { EditorLayout } from "./components/EditorLayout";
import { ExecutionTimeChart } from "./components/ExecutionTimeChart";

export default function EditorPage() {
  const [executionHistory, setExecutionHistory] = useState<
    { time: string; timestamp: string }[]
  >([]);
  const [showTime, setShowTime] = useState(false);

  return (
    <div>
      <EditorLayout
        setExecutionHistory={setExecutionHistory}
        setShowTime={setShowTime}
      />
      {showTime && <ExecutionTimeChart history={executionHistory} />}
    </div>
  );
}
