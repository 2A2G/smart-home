import { Home, Clock } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <Home className="mr-2 text-black" size={20} />
        <h1 className="text-xl font-semibold text-black">Casa Domótica</h1>
      </div>
      <button className="rounded-full p-2 bg-gray-100 hover:bg-gray-200">
        <Clock className="h-5 w-5 text-black" />
      </button>
    </header>
  );
};

export default Header;
