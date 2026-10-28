import { useState } from "react";

function TextExpander({
  collapsedNumWords = 15,
  expandButtonText = "Mostrar mais",
  collapseButtonText = "Mostrar menos",
  expanded = false,
  children,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const words = children.split(/\s+/);
  const isLongText = words.length > collapsedNumWords;

  const displayText = isExpanded
    ? children
    : words.slice(0, collapsedNumWords).join(" ") + (isLongText ? "..." : "");

  return (
    <div className="leading-relaxed">
      <span className="whitespace-pre-line text-ink/90">{displayText}</span>
      {isLongText && (
        <button
          onClick={() => setIsExpanded((exp) => !exp)}
          className="ml-2 text-sm font-medium text-accent hover:underline"
        >
          {isExpanded ? collapseButtonText : expandButtonText}
        </button>
      )}
    </div>
  );
}

export default TextExpander;
