import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useState, useEffect } from "react";
import { barf } from "thememirror"; // theme import

import "@/css/codeEditor.css";

interface CodeEditorProps {
  chatID: string;
}

export function CodeEditor({ chatID }: CodeEditorProps) {
  const code = useQuery(api.myFunctions.displayCode, { chatId: chatID });
  const fullCode = code?.[0]?.pythonCode || "";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (code) {
      setLoading(false);
    }
  }, [code]);

  return (
    <div className="code-editor-container">
      {loading ? (
        <div className="loader-container">
          <div className="gear"></div>
        </div>
      ) : (
        <CodeMirror
          value={fullCode}
          height="95vh"
          theme={barf}
          extensions={[python()]}
          readOnly
        />
      )}
    </div>
  );
}
