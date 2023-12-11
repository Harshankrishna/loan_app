import React, { useState } from "react";
import ApplicationFormHeader from "./ApplicationFormHeader";
import ApplicationFormBody from "./ApplicationFormBody";
import DisplayForm from "./DisplayForm";

function ApplicationForm() {
  const [proofNames, setProofNames] = useState([]); //proofNames
  const [display, setDisplay] = useState(false); //display the output
  const [output, setOutput] = useState(null); //Pass the formatted data as a prop to display the content in the component.

  const [proofForm, setProofForm] = useState([
    { id: 1, proofName: "", proofDetails: [] },
  ]);

  const [forms, setForms] = useState([
    { id: 1, documentName: "", groupLabel: "" },
  ]);

  //to display in JSON format
  const handleSubmit = () => {
    proofNames.forEach((element) => {
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
      let proofJSON =
        proofNames.length > 0
          ? proofNames.map((proof) => {
              return { proofName: proof, proofDetails: grouping };
            })
          : [];
      setOutput({ output: proofJSON });
      // setProofNames([]);
      // setProof(false);
    });

    setDisplay(true);

    setTimeout(() => {
      setForms([{ id: 1, documentName: "", groupLabel: "" }]);
    }, 1000);
  };

  const changeProofName = (newProofName, index) => {
    setProofNames((prevProofNames) => {
      return prevProofNames.map((proofName, i) =>
        i === index ? newProofName : proofName
      );
    });
  };

  return (
    <div className="documentsForm-container">
      <ApplicationFormHeader
        proofs={proofNames}
        setDisplay={setDisplay}
        setProofNames={setProofNames}
        proofForm={proofForm}
        setProofForm={setProofForm}
        forms={forms}
        // forms={forms}
        // updateForms={setForms}
      />
      <div>
        {proofNames.length > 0 &&
          proofNames.map((proof, index) => (
            <ApplicationFormBody
              key={index}
              index={index}
              proofName={proof}
              changeProofName={changeProofName}
              forms={forms}
              updateForms={setForms}
              // blurEventHandler={blurEventHandler}
              // onAddProof={onAddProof}
              // handleChange={handleChange}
              // onDeleteProof={onDeleteProof}
              handleSubmit={handleSubmit}
            />
          ))}
        <div className="button-down">
          <button
            className="button"
            disabled={proofNames.length === 0}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      {/* to display the output */}
      {display && <DisplayForm output={output} />}
    </div>
  );
}

export default ApplicationForm;
