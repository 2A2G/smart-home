import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import SystemStatus from "../components/SystemStatus";
import Footer from "../components/Footer";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <Header />
        <Dashboard />
        <SystemStatus />
        <Footer />
      </div>
    </div>
  );
}

export default App;
