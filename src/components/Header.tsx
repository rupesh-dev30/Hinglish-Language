import { Link, useLocation } from "react-router";
import { CodeSquare } from "lucide-react";

const navbar = [
  {
    id: 1,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    name: "Documentation",
    href: "/docs",
  },
  {
    id: 3,
    name: "Example",
    href: "/example",
  },
];

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-orange-500"
      : "text-gray-700 hover:text-gray-500";
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={"/"} className="flex items-center space-x-2">
          <CodeSquare />
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">
              HINGLISH CODE
            </h1>
          </div>
          <p className="text-sm text-gray-600">Programming, Bhai Style</p>
        </Link>

        <nav className="hidden md:flex space-x-6">
          {navbar.map((item) => (
            <Link key={item.id} to={item.href} className={isActive(item.href)}>
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

        <div className="md:hidden">
          <button className="text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
