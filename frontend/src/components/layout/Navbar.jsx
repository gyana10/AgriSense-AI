import { FaLeaf } from "react-icons/fa";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <FaLeaf className="text-3xl text-green-600" />

          <h1 className="text-2xl font-bold">
            AgriSense
            <span className="text-green-600"> AI</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 font-medium">
          <a href="#home" className="hover:text-green-600">Home</a>
          <a href="#features" className="hover:text-green-600">Features</a>
          <a href="#modules" className="hover:text-green-600">Modules</a>
          <a href="#about" className="hover:text-green-600">About</a>
        </nav>

        {/* Button */}
        <button className="rounded-xl bg-green-600 px-6 py-2 text-white hover:bg-green-700">
          Get Started
        </button>

      </div>
    </header>
  );
}

export default Navbar;