import { useState } from "react";

function TextExpander({
  collapsedNumWords = 15,
  expandButtonText = "Mostrar mais",
  collapseButtonText = "Mostrar menos",
  expanded = false,
  children,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const words = children.split(" ");
  const isLongText = words.length > collapsedNumWords;

  const displayText = isExpanded
    ? children
    : words.slice(0, collapsedNumWords).join(" ") + (isLongText ? "..." : "");

  return (
    <div>
      <span className="text-slate-600 whitespace-pre-line">{displayText}</span>
      {isLongText && (
        <button
          onClick={() => setIsExpanded((exp) => !exp)}
          className={`ml-2 font-medium ${
            isExpanded ? "text-[#1f09cd]" : "text-[#ff6622]"
          }`}
        >
          {isExpanded ? collapseButtonText : expandButtonText}
        </button>
      )}
    </div>
  );
}

export default TextExpander;
