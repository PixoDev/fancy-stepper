import React from "react";
import { Stepper, StepProps } from "./Stepper/Stepper";
import "./App.css";

function App() {
  return (
    <div className="wrapper">
      <Stepper
        steps={[
          {
            title: "I'm the step 1",
            // Render whatever you want here, we will improve this later
            element: stepProps => <Step {...stepProps} />,
          },
          {
            title: "I'm the step 2",
            element: stepProps => <Step {...stepProps} />,
          },
          {
            title: "I'm the step 3",
            element: stepProps => <Step {...stepProps} />,
          },
        ]}
      />
    </div>
  );
}

export default App;

const Step: React.FC<StepProps> = ({
  goNextStep,
  goPreviousStep,
  isFirst,
  isLast,
  step,
}) => {
  return (
    <div className="step">
      <div className="step-body">IM THE STEP {step}</div>
      <div className="step-actions">
        {/* If we are in the Step 1, we cannot go back, so we disable this */}
        <button
          className="step-button"
          disabled={isFirst}
          onClick={goPreviousStep}
        >
          GO PREVIOUS
        </button>
        {/* Same but with the last step */}
        <button className="step-button" disabled={isLast} onClick={goNextStep}>
          GO NEXT
        </button>
      </div>
    </div>
  );
};
