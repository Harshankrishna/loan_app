import React from "react";

function ApplicationFormHeader({ proof, setProof, setDisplay }) {
  return (
    <div className="document-requirements-container">
      <div className="text-center">
        <h2>Application Proof</h2>
        <button
          className="button"
          disabled={proof}
          onClick={() => {
            setProof(true);
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
