import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} HinglishCode. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
