import React from "react";

function ApplicationFormBody({
  proofName,
  setProofName,
  forms,
  blurEventHandler,
  onAddProof,
  handleChange,
  onDeleteProof,
  handleSubmit,
}) {
  return (
    <div className="document-requirements-container">
      <div className="container">
        <div className="row">
          <h4>Proof Name</h4>
          <div className="form">
            <div>
              <input
                required
                className="text-center"
                type="text"
                placeholder="Enter Proof Name"
                name="proofName"
                value={proofName}
                onChange={(e) => setProofName(e.target.value)}
              />
              {blurEventHandler(forms, handleChange, onAddProof, onDeleteProof)}
            </div>
            <div className="button-down">
              <button
                className="button"
                disabled={!proofName}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationFormBody;
