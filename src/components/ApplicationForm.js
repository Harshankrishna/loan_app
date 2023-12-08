import React, { useState } from "react";
import ApplicationFormHeader from "./ApplicationFormHeader";
import ApplicationFormBody from "./ApplicationFormBody";
import DisplayForm from "./DisplayForm";

function ApplicationForm() {
  const [output, setOutput] = useState(null);
  const [proof, setProof] = useState(false);
  const [display, setDisplay] = useState(false);
  const [proofName, setProofName] = useState("");
  const [forms, setForms] = useState([
    { id: 1, documentName: "", groupLabel: "" },
  ]);

  const onAdd = () => {
    const newId = forms.length + 1;
    setForms((prevForms) => [
      ...prevForms,
      { id: newId, documentName: "", groupLabel: "" },
    ]);
  };

  const onDelete = (id) => {
    if (forms.length === 1) return;
    setForms((prevForms) =>
      prevForms
        .filter((form) => form.id !== id)
        .map((form, index) => ({
          ...form,
          id: index + 1,
        }))
    );
  };

  const handleChange = (id, name, value) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === id ? { ...form, [name]: value } : form
      )
    );
  };

  const handleSubmit = () => {
    let grouping = forms.reduce((result, form, index) => {
      let groupLabel = form.groupLabel.toUpperCase() || "";
      if (!result[groupLabel]) {
        result[groupLabel] = [];
      }
      // console.log("ss", form);
      form.documentName && form.groupLabel && result[groupLabel].push(form);
      // console.log(result);
      return result;
    }, {});
    // console.info("submit", grouping);
    setDisplay(true);
    proofName && setOutput({ ProofName: proofName, ProofDetails: grouping });
    setProofName("");
    setProof(false);

    setTimeout(() => {
      setForms([{ id: 1, documentName: "", groupLabel: "" }]);
    }, 1000);
  };

  const handleBlur = (forms, handleChange, onAdd, onDelete) => {
    // console.info("~blur", forms);
    const proofDetails = {};
    forms.forEach((form, index) => {
      let { groupLabel } = form;
      groupLabel = groupLabel.toUpperCase();
      if (!proofDetails[groupLabel]) {
        proofDetails[groupLabel] = [];
      }

      proofDetails[groupLabel].push(
        <div className="container">
          <div className="add-document">
            <div key={index} className="input-document">
              <input
                required
                type="text"
                placeholder="Document Name"
                name="documentName"
                value={form.documentName}
                onChange={(e) =>
                  handleChange(form.id, e.target.name, e.target.value)
                }
              />
              <input
                required
                type="text"
                placeholder="Group Label"
                name="groupLabel"
                value={form.groupLabel.toUpperCase()}
                onBlur={() => handleBlur(forms, handleChange, onAdd, onDelete)} // Pass the required parameters
                onChange={(e) =>
                  handleChange(form.id, e.target.name, e.target.value)
                }
              />
              <span>{proofDetails[groupLabel].length + 1}</span>
              <button
                className="cssCircle minusSign"
                onClick={() => onDelete(form.id)}
              >
                &#8211;
              </button>
              <button
                disabled={!(form.documentName && form.groupLabel)}
                className="cssCircle plusSign"
                onClick={onAdd}
              >
                &#43;
              </button>
            </div>
          </div>
        </div>
      );
    });

    // Rendering grouped inputs
    return Object.values(proofDetails).map((group, index) => (
      <div key={index}>{group}</div>
    ));
  };

  return (
    <div className="documentsForm-container">
      <ApplicationFormHeader
        proof={proof}
        setProof={setProof}
        setDisplay={setDisplay}
      />
      {proof && (
        <ApplicationFormBody
          proofName={proofName}
          setProofName={setProofName}
          forms={forms}
          handleBlur={handleBlur}
          onAdd={onAdd}
          handleChange={handleChange}
          onDelete={onDelete}
          handleSubmit={handleSubmit}
        />
      )}
      {display && <DisplayForm output={output} />}
    </div>
  );
}

export default ApplicationForm;
