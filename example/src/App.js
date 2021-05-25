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
    lineNumbers: true,
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
  return (
    <div>
      <h5>Using component:</h5>
      <ReactCodeJar
        lineNumbers={true}
        code={code}
        onUpdate={onUpdate}
        highlight={highlight}
      />
    </div>
  );
`;

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
    lineNumbers: true,
    onUpdate,
    highlight
  });

  return (
    <div>
      <h4>Using hooks: </h4>
      <div ref={editorRef}></div>
      <button onClick={() => onUpdate(example(componentCode))}>Reset</button>
      <h5>Resulting code</h5>
      <pre>{code}</pre>
    </div>
  );
};

const Component = () => {
  const [code, onUpdate] = React.useState(example(componentCode));

  return (
    <div>
      <h4>Using component:</h4>
      <ReactCodeJar
        lineNumbers={true}
        code={code}
        onUpdate={onUpdate}
        highlight={highlight}
      />
      <button onClick={() => onUpdate(example(componentCode))}>Reset</button>
      <h5>Resulting code</h5>
      <pre>{code}</pre>
    </div>
  );
};

const App = () => {
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h1>React codejar examples</h1>
      <Hook />
      <hr />
      <Component />
    </div>
  );
};

export default App;
