import React from "react";
// This component receives a `text` prop
export default function AddStrongAndBreaks({ text }) {
  function processWithBreaks(chunk, keySeed) {
    const lines = chunk.split('\n');
    return lines.flatMap((line, i) =>
      i < lines.length - 1
        ? [line, <br key={`br${keySeed}_${i}`} />]
        : [line]
    );
  };
  function addStrongAndBreaks(textParam = "") {
    let text = textParam.replace(/\r\n?/g, "\n");
    const regex = /\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match, key = 0;
    const nodes = [];

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        nodes.push(...processWithBreaks(text.slice(lastIndex, match.index), key));
        key++;
      }
      nodes.push(
        <strong key={key++}>
          {processWithBreaks(match[1], key)}
        </strong>
      );
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      nodes.push(...processWithBreaks(text.slice(lastIndex), key));
    }
    return nodes;
  }
  return <span>{addStrongAndBreaks(text)}</span>;
}