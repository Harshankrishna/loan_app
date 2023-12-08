import React from "react";

function DisplayForm({ output }) {
  return (
    <div className="container">
      <h1>Output</h1>
      <pre>{JSON.stringify(output, null, 3)}</pre>
    </div>
  );
}

export default DisplayForm;
