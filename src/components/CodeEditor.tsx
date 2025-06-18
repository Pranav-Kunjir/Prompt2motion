import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
interface CodeEditorProps {
  chatID: string;
}

export function CodeEditor({ chatID }: CodeEditorProps) {
  const code = useQuery(api.myFunctions.displayCode, { chatId: chatID }) ?? [];

  return (
    <CodeMirror
      value={code?.[0]?.pythonCode || ""} // Adjust to match your schema
      height="200px"
      extensions={[python()]}
    />
  );
}
