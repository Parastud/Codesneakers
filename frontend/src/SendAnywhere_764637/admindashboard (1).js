import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'; // Ensure Tailwind CSS is imported

let root = ReactDOM.createRoot(document.querySelector("div.main"));
const App = () => {
  const [routes, setRoutes] = useState(generateDummyRoutes(30));
  const [crewMembers, setCrewMembers] = useState(generateDummyCrew(30));
  const [newRouteId, setNewRouteId] = useState(""); // Changed to handle route selection
  const [newTicketFee, setNewTicketFee] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedConductor, setSelectedConductor] = useState("");
  const [selectedRouteId, setSelectedRouteId] = useState("");
  const [selectedRouteToDelete, setSelectedRouteToDelete] = useState("");
  const [activeSection, setActiveSection] = useState("Create New Route");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddRoute = () => {
    const selectedRoute = routes.find(route => route.id === newRouteId);
    if (selectedRoute && newTicketFee) {
      setRoutes([...routes, {
        ...selectedRoute,
        ticketFee: Number(newTicketFee),
      }]);
      setNewRouteId("");
      setNewTicketFee("");
      setError("");
      setSuccess("Route added successfully.");
    } else {
      setError("Please select a route and enter a ticket fee.");
    }
  };

  const handleUpdateRoute = () => {
    if (selectedRouteId) {
      const updatedRoutes = routes.map(route => {
        if (route.id === selectedRouteId) {
          return {
            ...route,
            ticketFee: newTicketFee ? Number(newTicketFee) : route.ticketFee,
            driver: selectedDriver || route.driver,
            conductor: selectedConductor || route.conductor,
          };
        }
        return route;
      });
      setRoutes(updatedRoutes);
      setNewTicketFee("");
      setSelectedDriver("");
      setSelectedConductor("");
      setError("");
      setSuccess("Route updated successfully.");
    } else {
      setError("Please select a route.");
    }
  };

  const handleAssignCrew = () => {
    if (selectedRouteId) {
      setRoutes(routes.map(route =>
        route.id === selectedRouteId
          ? { ...route, driver: selectedDriver, conductor: selectedConductor }
          : route
      ));
      setSelectedDriver("");
      setSelectedConductor("");
      setError("");
      setSuccess("Crew assigned successfully.");
    } else {
      setError("Please select a route.");
    }
  };

  const handleDeleteRoute = () => {
    const routeToDelete = routes.find(route => route.id === selectedRouteToDelete);
    if (routeToDelete) {
      setRoutes(routes.filter(route => route.id !== selectedRouteToDelete));
      setSelectedRouteToDelete("");
      setError("");
      setSuccess("Route deleted successfully.");
    } else {
      setError("Route does not exist.");
    }
  };

  const handleToggleBusAvailability = (routeId) => {
    setRoutes(routes.map(route =>
      route.id === routeId ? { ...route, available: !route.available } : route
    ));
  };

  const totalActiveBuses = routes.filter(route => route.available).length;

  const getAvailableCrewMembers = (role) => {
    const assignedNames = routes.map(route => route[role.toLowerCase()]);
    return crewMembers.filter(member => 
      member.role === role && !assignedNames.includes(member.name)
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="container mx-auto bg-gray-800 p-8 rounded-lg shadow-lg max-w-screen-lg">
        {/* Navbar */}
        <nav className="mb-8">
          <ul className="flex flex-wrap justify-center space-x-4 md:space-x-8">
            {["Create New Route", "Assign Crew", "Update Route", "Delete Route", "Route Information"].map(section => (
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
                  {getAvailableCrewMembers('Driver').map(driver => (
                    <option key={driver.id} value={driver.name}>{driver.name}</option>
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
                  {getAvailableCrewMembers('Conductor').map(conductor => (
                    <option key={conductor.id} value={conductor.name}>{conductor.name}</option>
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

        {activeSection === "Route Information" && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Route Information</h2>
            <p className="text-center mb-4">Total Active Buses: {totalActiveBuses}</p>
            <table className="min-w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-4 text-left">Route ID</th>
                  <th className="py-2 px-4 text-left">Route</th>
                  <th className="py-2 px-4 text-left">Ticket Fee</th>
                  <th className="py-2 px-4 text-left">Driver</th>
                  <th className="py-2 px-4 text-left">Conductor</th>
                  <th className="py-2 px-4 text-left">Availability</th>
                </tr>
              </thead>
              <tbody>
                {routes.map(route => (
                  <tr key={route.id} className="border-b border-gray-700">
                    <td className="py-2 px-4">{route.id}</td>
                    <td className="py-2 px-4">{route.route}</td>
                    <td className="py-2 px-4">{route.ticketFee}</td>
                    <td className="py-2 px-4">{route.driver || "Unassigned"}</td>
                    <td className="py-2 px-4">{route.conductor || "Unassigned"}</td>
                    <td className="py-2 px-4">
                      {route.available ? "Available" : "Not Available"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </div>
  );
};

const getIcon = (section) => {
  switch (section) {
    case "Create New Route":
      return "plus-circle";
    case "Assign Crew":
      return "user-plus";
    case "Update Route":
      return "edit";
    case "Delete Route":
      return "trash";
    case "Route Information":
      return "info-circle";
    default:
      return "question-circle";
  }
};

const generateDummyRoutes = (count) => {
  const routes = [];
  for (let i = 1; i <= count; i++) {
    routes.push({
      id: i,
      route: `Route ${i}`,
      ticketFee: Math.floor(Math.random() * 100) + 1,
      driver: Math.random() > 0.5 ? `Driver ${i}` : "",
      conductor: Math.random() > 0.5 ? `Conductor ${i}` : "",
      available: Math.random() > 0.5,
    });
  }
  return routes;
};

const generateDummyCrew = (count) => {
  const crew = [];
  for (let i = 1; i <= count; i++) {
    crew.push({
      id: i,
      name: `Crew Member ${i}`,
      role: Math.random() > 0.5 ? "Driver" : "Conductor",
    });
  }
  return crew;
};

root.render(<App />);
