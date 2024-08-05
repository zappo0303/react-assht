import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// Định nghĩa kiểu cho context
interface FormContextType {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleSubmit: (event: React.FormEvent) => void;
  submitted: boolean;
  resetForm: () => void;
}

// Giá trị mặc định
const defaultValue: FormContextType = {
  username: "",
  setUsername: () => {},
  phone: "",
  setPhone: () => {},
  activeStep: 0,
  handleNext: () => {},
  handleBack: () => {},
  handleSubmit: () => {},
  submitted: false,
  resetForm: () => {},
};

const FormContext = createContext<FormContextType>(defaultValue);

export const useFormContext = () => {
  return useContext(FormContext);
};

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    navigate(`/user/${activeStep + 2}`);
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => {
        const newStep = prevStep - 1;
        navigate(`/user/${newStep + 1}`); 
        return newStep;
      });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    navigate(`/user/${activeStep + 2}`);

  };

  const resetForm = () => {
    setActiveStep(1);
    setSubmitted(false);
    navigate('/user/2'); 
  };

  return (
    <FormContext.Provider
      value={{
        username,
        setUsername,
        phone,
        setPhone,
        activeStep,
        handleNext,
        handleBack,
        handleSubmit,
        submitted,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
