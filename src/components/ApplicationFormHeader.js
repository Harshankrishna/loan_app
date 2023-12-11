import React from "react";

function ApplicationFormHeader({
  proofs,
  setProofNames,
  setDisplay,
  proofForm,
  setProofForm,
  forms,
}) {
  return (
    <div className="document-requirements-container">
      <div className="text-center">
        <h2>Application Proof</h2>
        <button
          className="button"
          // disabled={proof}
          onClick={() => {
            console.log("proofs", proofs);
            setProofNames([...proofs, ""]);
            setDisplay(false);
          }}
        >
          Add Proof
        </button>
      </div>
    </div>
  );
}

export default ApplicationFormHeader;
