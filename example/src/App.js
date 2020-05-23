import React from "react";

import { ReactCodeJar } from "react-codejar";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

const exampleCode = `const App = () => {
  const [code, onUpdate] = React.useState(exampleCode);

  const highlight = editor => {
    const text = editor.textContent;

    editor.innerHTML = Prism.highlight(
      text,
      Prism.languages.javascript,
      "javascript"
    );
  };

  const editorRef = useCodeJar({
    code,
    onUpdate,
    highlight
  });

  return (
    <div>
      <h5>Using hooks: </h5>
      <div ref={editorRef}></div>

      <h5>Using component:</h5>
      <ReactCodeJar code={code} onUpdate={onUpdate} highlight={highlight} />
    </div>
  );
};`;

const highlight = editor => {
  const text = editor.textContent;

  editor.innerHTML = Prism.highlight(
    text,
    Prism.languages.javascript,
    "javascript"
  );
};

const App = () => {
  const [code, onUpdate] = React.useState(exampleCode);

  // const editorRef = useCodeJar({
  //   code,
  //   onUpdate,
  //   highlight
  // });

  return (
    <div>
      {/* <h5>Using hooks: </h5> */}
      {/* <div ref={editorRef}></div> */}

      <h5>Using component:</h5>
      <ReactCodeJar code={code} onUpdate={onUpdate} highlight={highlight} />
      <button
        onClick={() => {
          onUpdate(code);
        }}
      >
        Reset
      </button>
      <pre>{code}</pre>
    </div>
  );
};

export default App;
