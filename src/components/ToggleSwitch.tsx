import React from "react";

interface ToggleSwitchProps {
  isOn: boolean;
  handleToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, handleToggle }) => {
  return (
    <div
      className={`w-12 h-6 rounded-full flex items-center transition-all duration-300 cursor-pointer ${
        isOn ? "bg-blue-500 justify-end" : "bg-gray-300 justify-start"
      }`}
      onClick={handleToggle}
    >
      <div className="h-5 w-5 rounded-full bg-white shadow m-0.5"></div>
    </div>
  );
};

export default ToggleSwitch;
