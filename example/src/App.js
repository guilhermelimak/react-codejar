import React from "react";

import { ReactCodeJar } from "react-codejar";
import "react-codejar/dist/index.css";

const my = editor => {
  let code = editor.textContent;
  code = code.replace(/\((\w+?)(\b)/g, '(<font color="#8a2be2">$1</font>$2');
  editor.innerHTML = code;
};

const App = () => {
  const [code, setCode] = React.useState("(format t 'lol')");

  return (
    <>
      {code}
      <ReactCodeJar
        style={{ width: "200px", height: "200px", border: "1px solid black" }}
        code={code}
        onUpdate={setCode}
        highlight={my}
      />
    </>
  );
};

export default App;
