import WaterMonitor from "../components/modules/LightControl";
import LightControl from "../components/modules/LightControl";
import SoundOpener from "../components/modules/SoundOpener";

const Dashboard = () => {
  return (
    <>
      <h2 className="text-2xl font-bold text-center text-black mb-6">
        Sistema de Control Domótico
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <WaterMonitor />
        <LightControl />
        <SoundOpener />
      </div>
    </>
  );
};

export default Dashboard;
