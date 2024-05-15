import { useState } from "react";
import { Phish as Props } from "../lib/types";

export default function Phish({ _id, content, recipient, status }: Props) {
  const [view, setView] = useState<"preview" | "raw">("preview");
  const toggleView = () => {
    if (view === "preview") {
      setView("raw");
    } else {
      setView("preview");
    }
  };

  return (
    <div className="bg-blue-100 p-5 border border-black">
      <div
        className={`border border-black w-max px-2 rounded-full  ${
          status === "Pending" ? "bg-gray-100" : "bg-emerald-200"
        }`}
      >
        {status}
      </div>

      <div className="w-max font-bold p-0.5 text-lg">{recipient}</div>
      <div className="text-sm">{_id}</div>

      <div className="flex flex-col mt-4">
        <button
          className="text-sm bg-gray-300 text-gray-900 px-1 rounded-sm py-0.5 self-end"
          onClick={toggleView}
        >
          View {view === "preview" ? "raw" : "preview"}
        </button>
        {view === "preview" ? (
          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
            className="h-48 overflow-auto bg-white p-2 pointer-events-none"
          />
        ) : (
          <div className="break-words p-2 bg-white h-48 overflow-auto">
            {content}
          </div>
        )}
      </div>
    </div>
  );
}
