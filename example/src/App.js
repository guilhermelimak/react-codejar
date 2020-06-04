import React from "react";
import { useCodeJar, ReactCodeJar } from "react-codejar";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

const example = type => `const App = () => {
  const [code, onUpdate] = React.useState(exampleCode);

  const highlight = editor => {
    const text = editor.textContent;

    editor.innerHTML = Prism.highlight(
      text,
      Prism.languages.javascript,
      "javascript"
    );
  };

  ${type}
};`;

const hooksCode = `
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
  );`;

const componentCode = `
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
  );`;

const highlight = editor => {
  const text = editor.textContent;

  editor.innerHTML = Prism.highlight(
    text,
    Prism.languages.javascript,
    "javascript"
  );
};

const Hook = () => {
  const [code, onUpdate] = React.useState(example(hooksCode));

  const editorRef = useCodeJar({
    code,
    onUpdate,
    highlight
  });

  return (
    <div>
      <h5>Using hooks: </h5>
      <div ref={editorRef}></div>
      <button onClick={() => onUpdate(example(componentCode))}>Reset</button>
      <pre>{code}</pre>
    </div>
  );
};

const Component = () => {
  const [code, onUpdate] = React.useState(example(componentCode));

  return (
    <div>
      <h5>Using component:</h5>
      <ReactCodeJar code={code} onUpdate={onUpdate} highlight={highlight} />
      <button onClick={() => onUpdate(example(componentCode))}>Reset</button>
      <pre>{code}</pre>
    </div>
  );
};

const App = () => {
  return (
    <>
      <Hook />
      <Component />
    </>
  );
};

export default App;
