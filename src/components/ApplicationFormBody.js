import React, { useState } from "react";

function ApplicationFormBody({
  proofName,
  changeProofName,
  forms,
  index,
  updateForms,
}) {
  const [formsGroup, setFormsGroup] = useState([
    { id: 1, documentName: "", groupLabel: "" },
  ]);
  const onAddProof = () => {
    const newId = forms.length + 1;
    setFormsGroup((prevForms) => [
      ...prevForms,
      { id: newId, documentName: "", groupLabel: "" },
    ]);
    updateForms((prevForms) => [
      ...prevForms,
      { id: newId, documentName: "", groupLabel: "" },
    ]);
  };

  //to delete a field
  const onDeleteProof = (id) => {
    if (formsGroup.length === 1) return;
    setFormsGroup((prevForms) =>
      prevForms
        .filter((form) => form.id !== id)
        .map((form, index) => ({
          ...form,
          id: index + 1,
        }))
    );
    updateForms((prevForms) =>
      prevForms
        .filter((form) => form.id !== id)
        .map((form, index) => ({
          ...form,
          id: index + 1,
        }))
    );
  };

  const handleChange = (id, name, value) => {
    setFormsGroup((prevForms) => {
      return prevForms.map((form) =>
        form.id === id ? { ...form, [name]: value } : form
      );
    });
    updateForms((prevForms) => {
      return prevForms.map((form) =>
        form.id === id ? { ...form, [name]: value } : form
      );
    });
  };

  const blurEventHandler = (
    formsGroup,
    handleChange,
    onAddProof,
    onDeleteProof
  ) => {
    const proofDetails = {};
    formsGroup.forEach((form, index) => {
      console.info("~blur change form", form);
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
    return Object.values(proofDetails).map((group, index) => {
      // console.info("~group",group);
      return <div key={index}>{group}</div>;
    });
  };
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
                onChange={(e) => changeProofName(e.target.value, index)}
              />
              {blurEventHandler(
                formsGroup,
                handleChange,
                onAddProof,
                onDeleteProof
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationFormBody;
