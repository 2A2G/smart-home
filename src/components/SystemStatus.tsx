const SystemStatus = () => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-1">Estado del Sistema</h2>
      <p className="text-gray-600 text-sm mb-4">
        Monitoreo en tiempo real de todos los componentes
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatusCard
          title="Sistema de Agua"
          status="Online"
          lastEvent="Nivel bajo"
        />
        <StatusCard
          title="Sistema de Iluminación"
          status="Online"
          lastEvent="Luz encendida"
        />
        <StatusCard
          title="Sistema de Armario"
          status="Online"
          lastEvent="Armario abierto"
        />
      </div>
    </div>
  );
};

interface StatusCardProps {
  title: string;
  status: string;
  lastEvent: string;
}

const StatusCard = ({ title, status, lastEvent }: StatusCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{title}</h3>
        <div className="flex items-center">
          <div
            className={`h-2 w-2 rounded-full mr-1 ${
              status === "Online" ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <span
            className={`text-sm ${
              status === "Online" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600">Último evento: {lastEvent}</p>
    </div>
  );
};

export default SystemStatus;
