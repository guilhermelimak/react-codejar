import * as React from "react";
import { CodeJar } from "codejar";
import { withLineNumbers } from "codejar/linenumbers";
import { getCaretOffset, setCurrentCursorPosition } from "./caret";

type CodejarOptions = {
  tab: string;
  indentOn: RegExp;
  spellcheck: boolean;
  catchTab: boolean;
  preserveIdent: boolean;
  history: boolean;
  window: Window;
  addClosing: boolean;
};

interface Props {
  highlight: (e: HTMLElement) => {};
  options?: Partial<CodejarOptions>;
  code: string;
  style: React.CSSProperties;
  onUpdate: (code: string) => void;
  lineNumbers?: boolean;
}

export const useCodeJar = (props: Props) => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const jar = React.useRef<CodeJar | null>(null);
  const [cursorOffset, setCursorOffset] = React.useState(0);

  React.useEffect(() => {
    if (!editorRef.current) return;

    const highlight = props.lineNumbers
      ? withLineNumbers(props.highlight)
      : props.highlight;

    jar.current = CodeJar(editorRef.current, highlight, props.options);

    jar.current.updateCode(props.code);

    jar.current.onUpdate(txt => {
      if (!editorRef.current) return;

      setCursorOffset(getCaretOffset(editorRef.current));
      props.onUpdate(txt);
    });

    return () => jar.current!.destroy();
  }, []);

  React.useEffect(() => {
    if (!jar.current || !editorRef.current) return;
    jar.current.updateCode(props.code);
    setCurrentCursorPosition(editorRef.current, cursorOffset);
  }, [props.code]);

  React.useEffect(() => {
    if (!jar.current || !props.options) return;

    jar.current.updateOptions(props.options);
  }, [props.options]);

  return editorRef;
};

export const ReactCodeJar: React.FC<Props> = props => {
  const editorRef = useCodeJar(props);

  return <div style={props.style} ref={editorRef}></div>;
};
