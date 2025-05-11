"use client";
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import ToggleSwitch from "../ToggleSwitch";

const LightControl = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [lightStatus, setLightStatus] = useState("Encendida");
  const [motionDetected, setMotionDetected] = useState("Detectado");
  const [remainingTime, setRemainingTime] = useState(26);
  const [lightDuration, setLightDuration] = useState(30);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (timerActive && remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            setLightStatus("Apagada");
            setTimerActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [remainingTime, timerActive]);

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
    if (!isEnabled) {
      setMotionDetected("Detectado");
      setLightStatus("Encendida");
      setRemainingTime(lightDuration);
      setTimerActive(true);
    } else {
      setLightStatus("Apagada");
      setTimerActive(false);
    }
  };

  const handleDurationChange = (e: { target: { value: string; }; }) => {
    const value = parseInt(e.target.value);
    setLightDuration(value);
    if (lightStatus === "Encendida") {
      setRemainingTime(value);
    }
  };

  const simulateMotion = () => {
    if (isEnabled) {
      setMotionDetected("Detectado");
      setLightStatus("Encendida");
      setRemainingTime(lightDuration);
      setTimerActive(true);
    }
  };

  const turnOffLight = () => {
    setLightStatus("Apagada");
    setRemainingTime(0);
    setTimerActive(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="text-yellow-500 mr-2">💡</div>
          <h3 className="font-semibold text-black">Control de Iluminación</h3>
        </div>
        <ToggleSwitch isOn={isEnabled} handleToggle={handleToggle} />
      </div>
      <p className="text-sm text-black mb-4">
        Sensor HC-SR501 y Módulo de Relé
      </p>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span>Estado de la luz:</span>
          <span
            className={`px-2 py-1 rounded-lg ${
              lightStatus === "Encendida"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {lightStatus}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span>Detección de movimiento:</span>
          <div className="flex items-center">
            <div
              className={`h-2 w-2 rounded-full ${
                motionDetected === "Detectado" ? "bg-green-600" : "bg-red-600"
              } mr-1`}
            ></div>
            <span
              className={`px-2 py-1 rounded-lg ${
                motionDetected === "Detectado"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {motionDetected}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span>Tiempo restante:</span>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{remainingTime}s</span>
          </div>
        </div>
        <div className="bg-gray-300 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-700 h-full rounded-full transition-all"
            style={{ width: `${(remainingTime / lightDuration) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span>Duración de iluminación:</span>
          <span>{lightDuration} segundos</span>
        </div>
        <input
          type="range"
          min="5"
          max="60"
          value={lightDuration}
          onChange={handleDurationChange}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={simulateMotion}
          className="py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium cursor-pointer"
          disabled={!isEnabled}
        >
          Simular movimiento
        </button>
        <button
          onClick={turnOffLight}
          className={`py-2 text-white rounded-lg font-medium ${
            lightStatus === "Apagada" || !isEnabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 cursor-pointer"
          }`}
          disabled={!isEnabled || lightStatus === "Apagada"}
        >
          Apagar luz
        </button>
      </div>
    </div>
  );
};

export default LightControl;
