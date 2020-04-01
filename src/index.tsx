import * as React from "react";
import { CodeJar } from "@medv/codejar";

interface Props {
  highlight: (e: HTMLElement) => {};
  options?: { tab: string };
  code: string;
  style: React.CSSProperties;
  onUpdate: (code: string) => void;
}

export const ReactCodeJar: React.FC<Props> = props => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  let jar: CodeJar;

  React.useEffect(() => {
    if (!editorRef.current) return;
    jar = new CodeJar(editorRef.current, props.highlight, props.options);
    jar.onUpdate(props.onUpdate);

    return jar.destroy;
  }, [editorRef.current]);

  React.useEffect(() => {
    if (!jar) return;
    jar.updateCode(props.code);
  }, [props.code]);

  React.useEffect(() => {
    if (!jar || !props.options) return;
    jar.updateOptions(props.options);
  }, [props.options]);

  return <div style={props.style} ref={editorRef}></div>;
};
