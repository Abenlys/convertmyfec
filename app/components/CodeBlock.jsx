import React, { useState } from "react";
import styles from "./MacroVBA.module.css";

export default function CodeBlock({ codeVBA }) {
  const [copied, setCopied] = useState(false);

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(codeVBA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <pre className={styles.MacroPre}>
      <button className={styles.copyButton} onClick={copyToClipBoard}>
        {copied ? "Copié !" : "📋 Copier"}
      </button>
      <code>{codeVBA}</code>
    </pre>
  );
}
