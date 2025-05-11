import { useState } from "react";
import { AlertCircle } from "lucide-react";
import ToggleSwitch from "../ToggleSwitch";

const WaterMonitor = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [waterLevel] = useState(39.7);
  const [waterDistance] = useState(60.3);
  const [alarmThreshold, setAlarmThreshold] = useState(20);
  const [alarmStatus, setAlarmStatus] = useState("Inactiva");

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
  };

  const handleThresholdChange = (e: { target: { value: string; }; }) => {
    const value = parseInt(e.target.value);
    setAlarmThreshold(value);

    // Actualizar el estado de la alarma basado en el nivel de agua y el umbral
    if (waterLevel < value && isEnabled) {
      setAlarmStatus("Activa");
    } else {
      setAlarmStatus("Inactiva");
    }
  };

  const silenceAlarm = () => {
    setAlarmStatus("Inactiva");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="text-blue-500 mr-2">💧</div>
          <h3 className="font-semibold">Monitor de Nivel de Agua</h3>
        </div>
        <ToggleSwitch isOn={isEnabled} handleToggle={handleToggle} />
      </div>
      <p className="text-sm text-gray-500 mb-4">Sensor HC-SR04 y Zumbador</p>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span>Nivel actual:</span>
          <span className="font-semibold px-2 py-1 bg-blue-100 rounded-lg text-blue-800">
            {waterLevel}%
          </span>
        </div>
        <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full"
            style={{ width: `${waterLevel}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span>Distancia al agua:</span>
          <span>{waterDistance} cm</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span>Umbral de alarma:</span>
          <span>{alarmThreshold}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={alarmThreshold}
          onChange={handleThresholdChange}
          className="w-full"
        />
        <p className="text-xs text-gray-500">
          La alarma se activará cuando el nivel sea menor al {alarmThreshold}%
        </p>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span>Estado de la alarma:</span>
          <div className="flex items-center">
            <AlertCircle
              className={`h-4 w-4 mr-1 ${
                alarmStatus === "Activa" ? "text-red-500" : "text-gray-400"
              }`}
            />
            <span
              className={
                alarmStatus === "Activa" ? "text-red-600" : "text-gray-600"
              }
            >
              {alarmStatus}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={silenceAlarm}
        className="w-full py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 font-medium"
      >
        Silenciar alarma
      </button>
    </div>
  );
};

export default WaterMonitor;
