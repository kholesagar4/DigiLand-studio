const Navbar = () => {
    return (
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-green-600"></h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full border border-green-300"
            />
            <div>
              <p className="text-sm font-semibold text-green-600">Admin Name</p>
              <p className="text-xs text-green-500">admin@example.com</p>
            </div>
          </div>
        </div>
      </header>
    );
  };
  
  export default Navbar;
  