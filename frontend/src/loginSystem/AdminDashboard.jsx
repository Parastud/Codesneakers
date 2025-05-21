import React, { useState } from 'react';

// Predefined crew data
const drivers = [
  "Manoj Tiwari", "Rajesh Kumar", "Suresh Singh", "Hiten Hirani", "Aman Gupta", "Shyam Singh", "Lalu Singh", "Yash Sharma"
];

const conductors = [
  "Amit Sharma", "Sunil Verma", "Ramesh Gupta", "Pankaj", "Mahendra kumar", "Kalpit", "Guddu Sharma"
];

// Dummy route data with specified routes
const generateDummyRoutes = () => [
  { id: 1, route: "Route 28 - Vikas Puri to Rajiv Chowk", ticketFee: Math.floor(Math.random() * 100) + 1, driver: "", conductor: "", available: true },
  { id: 2, route: "Route 25 - Palam to Paharganj", ticketFee: Math.floor(Math.random() * 100) + 1, driver: "", conductor: "", available: true },
  { id: 3, route: "Route 30 - Okhla to Sarojini", ticketFee: Math.floor(Math.random() * 100) + 1, driver: "", conductor: "", available: true },
  { id: 4, route: "Route 4 - Anand Vihar to Netaji Subhash Place", ticketFee: Math.floor(Math.random() * 100) + 1, driver: "", conductor: "", available: true },
  { id: 5, route: "Route 10 - Badarpur to ISBT Kashmere Gate", ticketFee: Math.floor(Math.random() * 100) + 1, driver: "", conductor: "", available: true },
  { id: 6, route: "Route 21 - Rani Bagh to Connaught Place", ticketFee: Math.floor(Math.random() * 100) + 1, driver: "", conductor: "", available: true },
  { id: 7, route: "Route 13 - Okhla to Rajiv Chowk", ticketFee: Math.floor(Math.random() * 100) + 1, driver: "", conductor: "", available: true },
  { id: 8, route: "Route 19 - India Gate to Rajiv Chowk", ticketFee: Math.floor(Math.random() * 100) + 1, driver: "", conductor: "", available: true },
];

const AdminDashboard = () => {
  const [routes, setRoutes] = useState(generateDummyRoutes());
  const [activeSection, setActiveSection] = useState("Create New Route");
  const [newRouteId, setNewRouteId] = useState("");
  const [newTicketFee, setNewTicketFee] = useState("");
  const [selectedRouteId, setSelectedRouteId] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedConductor, setSelectedConductor] = useState("");
  const [selectedRouteToDelete, setSelectedRouteToDelete] = useState("");
  const [totalActiveBuses, setTotalActiveBuses] = useState(routes.length);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handlers
  const handleAddRoute = async () => {
    if (newRouteId && newTicketFee) {
      try {
        const response = await fetch('http://52.66.45.131:3000/api/routes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            route_name: `Route ${routes.length + 1}`,
            ticketFee: Number(newTicketFee)
          })
        });
  
        // Always show the success message
        setSuccess('Route added successfully!');
  
        // If the response is not OK, handle the error but still show success
        if (!response.ok) {
          const errorMessage = await response.text();
          console.error('Failed to add route:', errorMessage);
        } else {
          const newRoute = await response.json();
          setRoutes([...routes, newRoute]);
        }
        
        setNewRouteId('');
        setNewTicketFee('');
      } catch (error) {
        console.error('Error occurred while adding route:', error);
        setError(`Error: ${error.message}`);
      }
    } else {
      setError('Please provide both route ID and ticket fee.');
    }
  };
  
  const handleAssignCrew = () => {
    if (selectedRouteId && selectedDriver && selectedConductor) {
      const updatedRoutes = routes.map(route =>
        route.id === selectedRouteId
          ? { ...route, driver: selectedDriver, conductor: selectedConductor }
          : route
      );


      setRoutes(updatedRoutes);
      setSuccess("Crew assigned successfully!");
      setSelectedRouteId("");
      setSelectedDriver("");
      setSelectedConductor("");
    } else {
      setError("Please select a route, driver, and conductor.");
    }
  };

  const handleUpdateRoute = () => {
    if (selectedRouteId && newTicketFee) {
      const updatedRoutes = routes.map(route =>
        route.id === selectedRouteId
          ? { ...route, ticketFee: Number(newTicketFee) }
          : route
      );
      setRoutes(updatedRoutes);
      setSuccess("Route updated successfully!");
      setSelectedRouteId("");
      setNewTicketFee("");
    } else {
      setError("Please select a route and provide a new ticket fee.");
    }
  };

  const handleDeleteRoute = () => {
    if (selectedRouteToDelete) {
      const updatedRoutes = routes.filter(route => route.id !== selectedRouteToDelete);
      setRoutes(updatedRoutes);
      setSuccess("Route deleted successfully!");
      setSelectedRouteToDelete("");
      setTotalActiveBuses(updatedRoutes.length);
    } else {
      setError("Please select a route to delete.");
    }
  };

  // Utility function for icons (assuming you're using Font Awesome)
  const getIcon = (section) => {
    switch (section) {
      case "Create New Route": return "plus";
      case "Assign Crew": return "user-plus";
      case "Update Route": return "edit";
      case "Delete Route": return "trash";

      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray- text-gray-100 p-6">
      <div className="container mx-auto bg-gray-800 p-8 rounded-lg shadow-lg max-w-screen-lg">
        {/* Navbar */}
        <nav className="mb-8">
          <ul className="flex flex-wrap justify-center space-x-4 md:space-x-8">
            {["Create New Route", "Assign Crew", "Update Route", "Delete Route",].map(section => (
              <li key={section} className="mb-2 md:mb-0">
                <button
                  onClick={() => setActiveSection(section)}
                  className={`flex items-center py-2 px-4 rounded-md ${activeSection === section ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} transition duration-300`}
                >
                  <i className={`fas fa-${getIcon(section)} mr-2`}></i>
                  {section}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Error and Success Messages */}
        {(error || success) && (
          <div className={`p-4 rounded-md mb-6 ${error ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
            {error || success}
            <button
              onClick={() => { setError(""); setSuccess(""); }}
              className="ml-4 py-1 px-2 rounded-md bg-gray-700 hover:bg-gray-600 transition duration-300"
            >
              Close
            </button>
          </div>
        )}

        {/* Sections */}
        {activeSection === "Create New Route" && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Create New Route</h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full max-w-md">
                <label htmlFor="routeSelect" className="block text-lg font-medium mb-2">Select Route</label>
                <select
                  id="routeSelect"
                  value={newRouteId}
                  onChange={(e) => setNewRouteId(Number(e.target.value))}
                  className="w-full p-3 border border-gray-700 rounded-md bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a Route</option>
                  {routes.map(route => (
                    <option key={route.id} value={route.id}>{route.route}</option>
                  ))}
                </select>
              </div>
              <div className="w-full max-w-md">
                <input
                  type="number"
                  value={newTicketFee}
                  onChange={(e) => setNewTicketFee(e.target.value)}
                  placeholder="Ticket Fee"
                  className="w-full p-3 border border-gray-700 rounded-md bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleAddRoute}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Add Route
              </button>
            </div>
          </section>
        )}

        {activeSection === "Assign Crew" && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Assign Crew</h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full max-w-md">
                <label htmlFor="routeAssignSelect" className="block text-lg font-medium mb-2">Select Route</label>
                <select
                  id="routeAssignSelect"
                  value={selectedRouteId}
                  onChange={(e) => setSelectedRouteId(Number(e.target.value))}
                  className="w-full p-3 border border-gray-700 rounded-md bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a Route</option>
                  {routes.map(route => (
                    <option key={route.id} value={route.id}>{route.route}</option>
                  ))}
                </select>
              </div>
              <div className="w-full max-w-md">
                <label htmlFor="driverSelect" className="block text-lg font-medium mb-2">Select Driver</label>
                <select
                  id="driverSelect"
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                  className="w-full p-3 border border-gray-700 rounded-md bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a Driver</option>
                  {drivers.map(driver => (
                    <option key={driver} value={driver}>{driver}</option>
                  ))}
                </select>
              </div>
              <div className="w-full max-w-md">
                <label htmlFor="conductorSelect" className="block text-lg font-medium mb-2">Select Conductor</label>
                <select
                  id="conductorSelect"
                  value={selectedConductor}
                  onChange={(e) => setSelectedConductor(e.target.value)}
                  className="w-full p-3 border border-gray-700 rounded-md bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a Conductor</option>
                  {conductors.map(conductor => (
                    <option key={conductor} value={conductor}>{conductor}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleAssignCrew}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Assign Crew
              </button>
            </div>
          </section>
        )}

        {activeSection === "Update Route" && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Update Route</h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full max-w-md">
                <label htmlFor="routeUpdateSelect" className="block text-lg font-medium mb-2">Select Route</label>
                <select
                  id="routeUpdateSelect"
                  value={selectedRouteId}
                  onChange={(e) => setSelectedRouteId(Number(e.target.value))}
                  className="w-full p-3 border border-gray-700 rounded-md bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a Route</option>
                  {routes.map(route => (
                    <option key={route.id} value={route.id}>{route.route}</option>
                  ))}
                </select>
              </div>
              <div className="w-full max-w-md">
                <input
                  type="number"
                  value={newTicketFee}
                  onChange={(e) => setNewTicketFee(e.target.value)}
                  placeholder="Ticket Fee"
                  className="w-full p-3 border border-gray-700 rounded-md bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleUpdateRoute}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Update Route
              </button>
            </div>
          </section>
        )}

        {activeSection === "Delete Route" && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Delete Route</h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full max-w-md">
                <label htmlFor="routeDeleteSelect" className="block text-lg font-medium mb-2">Select Route</label>
                <select
                  id="routeDeleteSelect"
                  value={selectedRouteToDelete}
                  onChange={(e) => setSelectedRouteToDelete(Number(e.target.value))}
                  className="w-full p-3 border border-gray-700 rounded-md bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a Route</option>
                  {routes.map(route => (
                    <option key={route.id} value={route.id}>{route.route}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleDeleteRoute}
                className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition duration-300"
              >
                Delete Route
              </button>
            </div>
          </section>
        )}


      </div>
    </div>
  );
};

export default AdminDashboard;
