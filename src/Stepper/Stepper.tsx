import React, { useState, useRef, useEffect } from "react";
import "./Stepper.css";

interface StepperProps {
  steps: Step[];
}

interface Step {
  // Title of the step
  title: string;
  // Element to render in the step, can contain
  // a form, an image, whatever
  element: (stepProps: StepProps) => JSX.Element;
}

export interface StepProps {
  // Here we tell the stepper to go to the next or previous step from
  // the element we are rendering
  goNextStep: () => void;
  goPreviousStep: () => void;
  // Tells you the active step right now
  currentStep: number;
  // And this is useful to know where you are
  isLast: boolean;
  isFirst: boolean;
  // Tells you the step in which you are right now, starting
  // from 1
  step: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const stepperSelector = useRef<HTMLDivElement>(null);
  // Every time our currentStep is updated, we are going to trigger this
  useEffect(() => {
    moveStepper();
  }, [currentStep]);

  const goNextStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep <= steps.length) {
      setCurrentStep(nextStep);
    }
  };

  const goPreviousStep = () => {
    const previousStep = currentStep - 1;
    if (previousStep >= 1) {
      setCurrentStep(previousStep);
    }
  };

  const moveStepper = () => {
    if (stepperSelector.current) {
      const stepper = stepperSelector.current;
      const stepWidth = stepper.offsetWidth / steps.length;
      stepper.style.transform = `translateX(-${
        stepWidth * (currentStep - 1)
      }px)`;
    }
  };

  return (
    <div className="stepper stepper-wrapper">
      <StepperProgress
        stepTitles={steps.map(step => step.title)}
        currentStep={currentStep}
      />
      {/* This will display our current step */}
      <div className="stepper-selector" ref={stepperSelector}>
        {steps.map((step, i) => (
          <div className="step-wrapper">
            <step.element
              step={i + 1}
              goNextStep={goNextStep}
              goPreviousStep={goPreviousStep}
              // From our state
              currentStep={currentStep}
              // Check if this step is the first one
              isFirst={i === 0}
              // Check if its the last one
              isLast={i === steps.length - 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const StepperProgress: React.FC<{
  stepTitles: string[];
  currentStep: number;
}> = ({ stepTitles, currentStep }) => {
  const progressPerStep = 100 / (stepTitles.length - 1);
  const progress = (currentStep - 1) * progressPerStep;
  return (
    <div className="stepper-progress">
      <div className="stepper-progress-wrapper">
        <div
          className="stepper-progress-bar"
          style={{ width: progress + "%" }}
        />
        {stepTitles.map((title, i) => (
          <div className="step-title">
            <div className="step-title-number">{i + 1}</div>
            {title}
          </div>
        ))}
      </div>
    </div>
  );
};
