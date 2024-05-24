import { MouseEventHandler, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { Phish as PhishType } from "../lib/types";
import { useNavigate } from "react-router-dom";

interface Props extends PhishType {
  clickable?: boolean;
}

export default function PhishCard({
  _id,
  content,
  recipient,
  status,
  createdAt,
  updatedAt,
  clickable = false,
}: Props) {
  const navigate = useNavigate();

  const [view, setView] = useState<"preview" | "raw">("preview");
  const toggleView: MouseEventHandler = (e) => {
    e.stopPropagation();

    if (view === "preview") {
      setView("raw");
    } else {
      setView("preview");
    }
  };

  return (
    <div
      className={`bg-blue-100 p-5 border border-black ${
        clickable ? "cursor-pointer" : "cursor-default"
      }`}
      onClick={() => {
        if (!clickable) {
          return;
        }

        navigate(`phish/${_id}`);
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
        <div
          className={`border border-black w-max px-2 rounded-full  ${
            status === "Pending" ? "bg-gray-100" : "bg-emerald-200"
          }`}
        >
          {status}
        </div>
        {status === "Successful" && (
          <p>Clicked {dayjs(updatedAt).format("MMMM DD, YYYY [at] hh:mm a")}</p>
        )}
      </div>

      <div className="w-max font-bold p-0.5 text-lg">{recipient}</div>
      <div className="text-sm">{_id}</div>
      <div
        className="text-sm underline decoration-dotted"
        title={dayjs(createdAt).format("MMMM DD, YYYY hh:mm a")}
      >
        {dayjs(createdAt).fromNow()}
      </div>

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
