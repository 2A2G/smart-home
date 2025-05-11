"use client";
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const Footer = () => {
  const [time, setTime] = useState(formatTime(new Date()));

  // Actualiza la hora cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function formatTime(date: Date) {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }

  return (
    <footer className="mt-8 flex justify-between items-center">
      <button className="rounded-full bg-gray-800 text-white w-8 h-8 flex items-center justify-center">
        <span className="font-semibold">N</span>
      </button>
      <div className="flex items-center text-gray-500 text-sm">
        <Clock className="h-4 w-4 mr-1" />
        <span>Última actualización: {time}</span>
      </div>
    </footer>
  );
};

export default Footer;
