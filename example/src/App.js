import React from "react";

import { useCodeJar } from "react-codejar";
import "react-codejar/dist/index.css";

const highlight = editor => {
  let code = editor.textContent;
  code = code.replace(/\((\w+?)(\b)/g, '(<font color="#8a2be2">$1</font>$2');
  editor.innerHTML = code;
};

const App = () => {
  const [code, onUpdate] = React.useState('(format t "lisp example")');

  const editorRef = useCodeJar({
    code,
    onUpdate,
    highlight
  });

  return (
    <>
      <div ref={editorRef}></div>
    </>
  );
};

export default App;
