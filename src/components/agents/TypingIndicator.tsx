"use client";

import { cn } from "@/lib/utils";
import { agents } from "@/data/agents";

interface TypingIndicatorProps {
  agentId: string;
}

export default function TypingIndicator({ agentId }: TypingIndicatorProps) {
  const agent = agents.find((a) => a.id === agentId);

  return (
    <div className="flex gap-3 px-4 py-3">
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm shrink-0",
          agent?.color || "bg-gray-500"
        )}
      >
        {agent?.emoji}
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <p className="text-xs font-semibold text-gray-500 mb-1.5">
          {agent?.emoji} {agent?.name}
        </p>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
