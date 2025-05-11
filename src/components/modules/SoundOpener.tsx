"use client";
import React, { useState } from "react";
import { Volume2, ArrowRight } from "lucide-react";
import ToggleSwitch from "../ToggleSwitch";

const SoundOpener = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [cabinetStatus, setCabinetStatus] = useState("Abierto");
  const [soundDetection, setSoundDetection] = useState("En espera");
  const [motorPosition, setMotorPosition] = useState(100);
  const [micSensitivity, setMicSensitivity] = useState(70);

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
  };

  const handleSensitivityChange = (e: { target: { value: string } }) => {
    setMicSensitivity(parseInt(e.target.value));
  };

  const simulateClap = () => {
    if (isEnabled) {
      // Simular detección de sonido
      setSoundDetection("Detectado");

      // Cambiar el estado del armario
      const newStatus = cabinetStatus === "Abierto" ? "Cerrado" : "Abierto";
      setCabinetStatus(newStatus);

      // Actualizar la posición del motor según el estado
      setMotorPosition(newStatus === "Abierto" ? 100 : 0);

      // Volver al estado de espera después de 2 segundos
      setTimeout(() => {
        setSoundDetection("En espera");
      }, 2000);
    }
  };

  const closeDrawer = () => {
    if (isEnabled && cabinetStatus === "Abierto") {
      setCabinetStatus("Cerrado");
      setMotorPosition(0);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="text-purple-500 mr-2">🎤</div>
          <h3 className="font-semibold">Apertura por Sonido</h3>
        </div>
        <ToggleSwitch isOn={isEnabled} handleToggle={handleToggle} />
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Micrófono KY-037 y Motor 28BYJ-48
      </p>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span>Estado del armario:</span>
          <div className="flex items-center">
            <ArrowRight
              className={`h-4 w-4 mr-1 ${
                cabinetStatus === "Abierto" ? "text-green-500" : "text-red-500"
              }`}
            />
            <span
              className={`px-2 py-1 rounded-lg ${
                cabinetStatus === "Abierto"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {cabinetStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span>Detección de sonido:</span>
          <div className="flex items-center">
            <Volume2
              className={`h-4 w-4 mr-1 ${
                soundDetection === "Detectado"
                  ? "text-blue-500"
                  : "text-gray-400"
              }`}
            />
            <span
              className={
                soundDetection === "Detectado"
                  ? "text-blue-600"
                  : "text-gray-600"
              }
            >
              {soundDetection}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span>Posición del motor:</span>
          <span>{motorPosition}%</span>
        </div>
        <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all"
            style={{ width: `${motorPosition}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span>Sensibilidad del micrófono:</span>
          <span>{micSensitivity}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={micSensitivity}
          onChange={handleSensitivityChange}
          disabled={!isEnabled}
          className="w-full"
        />
        <p className="text-xs text-gray-500">
          Mayor sensibilidad detecta sonidos más suaves
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={simulateClap}
          className="py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 font-medium"
          disabled={!isEnabled}
        >
          Simular aplauso
        </button>
        <button
          onClick={closeDrawer}
          className="py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 font-medium"
          disabled={!isEnabled || cabinetStatus === "Cerrado"}
        >
          Cerrar armario
        </button>
      </div>
    </div>
  );
};

export default SoundOpener;
