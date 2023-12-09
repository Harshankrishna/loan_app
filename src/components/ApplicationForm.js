import React, { useState } from "react";
import ApplicationFormHeader from "./ApplicationFormHeader";
import ApplicationFormBody from "./ApplicationFormBody";
import DisplayForm from "./DisplayForm";

function ApplicationForm() {
  const [proofName, setProofName] = useState(""); //proofName
  const [proof, setProof] = useState(false); //display proofDetails
  const [display, setDisplay] = useState(false); //display the output
  const [output, setOutput] = useState(null); //Pass the formatted data as a prop to display the content in the component.

  const [forms, setForms] = useState([
    { id: 1, documentName: "", groupLabel: "" },
  ]);

  //to add a field
  const onAddProof = () => {
    const newId = forms.length + 1;
    setForms((prevForms) => [
      ...prevForms,
      { id: newId, documentName: "", groupLabel: "" },
    ]);
  };

  //to delete a field
  const onDeleteProof = (id) => {
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

  //to manage the data entered in the 'document-name' and 'Group-label' fields
  const handleChange = (id, name, value) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === id ? { ...form, [name]: value } : form
      )
    );
  };

  //to display in JSON format
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

  const blurEventHandler = (forms, handleChange, onAddProof, onDeleteProof) => {
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
            <div key={index}>
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
                onBlur={() =>
                  blurEventHandler(
                    forms,
                    handleChange,
                    onAddProof,
                    onDeleteProof
                  )
                } // Pass the required parameters
                onChange={(e) =>
                  handleChange(form.id, e.target.name, e.target.value)
                }
              />
              <span>{proofDetails[groupLabel].length + 1}</span>
              <button
                className="cssCircle minusSign"
                onClick={() => onDeleteProof(form.id)}
              >
                &#8211;
              </button>
              <button
                disabled={!(form.documentName && form.groupLabel)}
                className="cssCircle plusSign"
                onClick={onAddProof}
              >
                &#43;
              </button>
            </div>
          </div>
        </div>
      );
    });

    // rendering proofdetails
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
          blurEventHandler={blurEventHandler}
          onAddProof={onAddProof}
          handleChange={handleChange}
          onDeleteProof={onDeleteProof}
          handleSubmit={handleSubmit}
        />
      )}
      {/* to display the output */}
      {display && <DisplayForm output={output} />}
    </div>
  );
}

export default ApplicationForm;
