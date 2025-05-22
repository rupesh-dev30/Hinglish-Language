import { useState } from "react";
import { Link, useLocation } from "react-router";
import { CodeSquare, X, Menu } from "lucide-react";

const navbar = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Documentation", href: "/docs" },
  { id: 3, name: "Update", href: "/update" },
];

export default function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-orange-500 font-semibold"
      : "text-gray-700 hover:text-gray-500";
  };

  return (
    <header className="bg-white shadow-md z-50 relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={"/"} className="flex items-center space-x-2">
          <CodeSquare className="text-orange-500" />
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">
              HINGLISH CODE
            </h1>
            <p className="text-sm text-gray-600 -mt-1">
              Programming, Bhai Style
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navbar.map((item) => (
            <Link key={item.id} to={item.href} className={isActive(item.href)}>
              {item.name}
            </Link>
          ))}
          <a
            href="https://github.com/rupesh-dev30/Hinglish-Language"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-500 transition-colors"
          >
            GitHub
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(true)} className="text-gray-700">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sheet */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            <nav className="flex flex-col space-y-4">
              {navbar.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className={isActive(item.href)}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="https://github.com/rupesh-dev30"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-500 transition-colors"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
