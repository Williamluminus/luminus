"use client";

import { cn } from "@/lib/utils";
import { agents, type ChatMessage } from "@/data/agents";
import { User, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ChatMessageBubbleProps {
  message: ChatMessage;
  isStreaming?: boolean;
}

export default function ChatMessageBubble({ message, isStreaming }: ChatMessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";
  const agent = agents.find((a) => a.id === message.agentId);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Markdown rendering for code blocks, bold, inline code, lists
  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, i) => {
      if (part.startsWith("```")) {
        const lines = part.slice(3, -3).split("\n");
        const lang = lines[0].trim();
        const code = lang ? lines.slice(1).join("\n") : lines.join("\n");
        return (
          <div key={i} className="my-2 rounded-lg overflow-hidden bg-gray-900">
            {lang && (
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-400 text-xs">
                <span>{lang}</span>
                <button
                  onClick={handleCopy}
                  className="hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
            <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Handle bold, inline code, and text
      return (
        <span key={i}>
          {part.split("\n").map((line, j) => (
            <span key={j}>
              {j > 0 && <br />}
              {line.split(/(\*\*.*?\*\*|`.*?`)/g).map((segment, k) => {
                if (segment.startsWith("**") && segment.endsWith("**")) {
                  return (
                    <strong key={k} className="font-semibold">
                      {segment.slice(2, -2)}
                    </strong>
                  );
                }
                if (segment.startsWith("`") && segment.endsWith("`")) {
                  return (
                    <code
                      key={k}
                      className={cn(
                        "px-1.5 py-0.5 rounded text-xs font-mono",
                        isUser
                          ? "bg-white/20 text-white"
                          : "bg-gray-200 text-gray-800"
                      )}
                    >
                      {segment.slice(1, -1)}
                    </code>
                  );
                }
                return segment;
              })}
            </span>
          ))}
        </span>
      );
    });
  };

  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-3 group",
        isUser ? "flex-row-reverse" : ""
      )}
    >
      {/* Avatar */}
      {isUser ? (
        <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      ) : (
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm shrink-0",
            agent?.color || "bg-gray-500"
          )}
        >
          {agent?.emoji}
        </div>
      )}

      {/* Message */}
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-primary-600 text-white rounded-br-md"
            : "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm"
        )}
      >
        {!isUser && (
          <p className="text-xs font-semibold text-gray-500 mb-1">
            {agent?.emoji} {agent?.name}
          </p>
        )}
        <div className={cn(isUser ? "text-white" : "text-gray-800")}>
          {renderContent(message.content)}
          {isStreaming && (
            <span className="inline-block w-2 h-4 ml-0.5 bg-primary-500 animate-pulse rounded-sm" />
          )}
        </div>
        <div
          className={cn(
            "flex items-center gap-2 mt-2 text-[10px]",
            isUser ? "text-white/60 justify-end" : "text-gray-400"
          )}
        >
          {!isStreaming && <span>{formatTime(message.timestamp)}</span>}
          {isStreaming && (
            <span className="text-green-500 font-medium">streaming...</span>
          )}
          {!isUser && !isStreaming && (
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-gray-600"
              title="Copiar mensagem"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
