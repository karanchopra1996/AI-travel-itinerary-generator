import { useState, useEffect } from 'react';
import Select from 'react-select';

const usaCities = {
  '': ['Undefined'],
'Alabama': ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville'],
'Alaska': ['Anchorage', 'Fairbanks', 'Juneau'],
'Arizona': ['Phoenix', 'Tucson', 'Mesa', 'Scottsdale'],
'Arkansas': ['Little Rock', 'Fort Smith', 'Fayetteville'],
'California': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
'Colorado': ['Denver', 'Colorado Springs', 'Boulder'],
'Connecticut': ['Bridgeport', 'New Haven', 'Hartford'],
'Delaware': ['Wilmington', 'Dover', 'Newark'],
'Florida': ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],
'Georgia': ['Atlanta', 'Savannah', 'Augusta'],
'Hawaii': ['Honolulu', 'Hilo', 'Kailua'],
'Idaho': ['Boise', 'Nampa', 'Meridian'],
'Illinois': ['Chicago', 'Springfield', 'Peoria'],
'Indiana': ['Indianapolis', 'Fort Wayne', 'South Bend'],
'Iowa': ['Des Moines', 'Cedar Rapids', 'Davenport'],
'Kansas': ['Wichita', 'Overland Park', 'Kansas City'],
'Kentucky': ['Louisville', 'Lexington', 'Bowling Green'],
'Louisiana': ['New Orleans', 'Baton Rouge', 'Shreveport'],
'Maine': ['Portland', 'Bangor', 'Lewiston'],
'Maryland': ['Baltimore', 'Annapolis', 'Rockville'],
'Massachusetts': ['Boston', 'Cambridge', 'Springfield'],
'Michigan': ['Detroit', 'Grand Rapids', 'Lansing'],
'Minnesota': ['Minneapolis', 'St. Paul', 'Rochester'],
'Mississippi': ['Jackson', 'Gulfport', 'Southaven'],
'Missouri': ['Kansas City', 'St. Louis', 'Springfield'],
'Montana': ['Billings', 'Missoula', 'Great Falls'],
'Nebraska': ['Omaha', 'Lincoln', 'Bellevue'],
'Nevada': ['Las Vegas', 'Reno', 'Henderson'],
'New Hampshire': ['Manchester', 'Nashua', 'Concord'],
'New Jersey': ['Newark', 'Jersey City', 'Trenton'],
'New Mexico': ['Albuquerque', 'Santa Fe', 'Las Cruces'],
'New York': ['New York City', 'Buffalo', 'Rochester'],
'North Carolina': ['Charlotte', 'Raleigh', 'Greensboro'],
'North Dakota': ['Fargo', 'Bismarck', 'Grand Forks'],
'Ohio': ['Cleveland', 'Columbus', 'Cincinnati'],
'Oklahoma': ['Oklahoma City', 'Tulsa', 'Norman'],
'Oregon': ['Portland', 'Salem', 'Eugene'],
'Pennsylvania': ['Philadelphia', 'Pittsburgh', 'Harrisburg'],
'Rhode Island': ['Providence', 'Warwick', 'Cranston'],
'South Carolina': ['Charleston', 'Columbia', 'Greenville'],
'South Dakota': ['Sioux Falls', 'Rapid City', 'Aberdeen'],
'Tennessee': ['Nashville', 'Memphis', 'Knoxville'],
'Texas': ['Houston', 'Dallas', 'Austin', 'San Antonio'],
'Utah': ['Salt Lake City', 'Provo', 'Orem'],
'Vermont': ['Burlington', 'Essex', 'Rutland'],
'Virginia': ['Richmond', 'Virginia Beach', 'Norfolk'],
'Washington': ['Seattle', 'Spokane', 'Tacoma'],
'West Virginia': ['Charleston', 'Huntington', 'Morgantown'],
'Wisconsin': ['Milwaukee', 'Madison', 'Green Bay'],
'Wyoming': ['Cheyenne', 'Casper', 'Laramie']
};

export default function Home() {
  const [isMounted, setIsMounted] = useState(false); // State to check if the component is mounted
  const [country] = useState("USA");  // Fixed to USA
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [days, setDays] = useState(1);
  const [itinerary, setItinerary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // This state holds the states list from usaCities
  const states = Object.keys(usaCities).map((state) => ({
    value: state,
    label: state,
  }));

  // Set the component as mounted after the first render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If not mounted, prevent rendering of client-only components
  if (!isMounted) {
    return null; // Return null or a loading spinner here
  }

  const generateItinerary = async () => {
    setIsLoading(true);
    setError("");
    setItinerary("");

    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country, state, city, days }),
      });
      const data = await res.json();
      setItinerary(data.itinerary);
    } catch (error) {
      setError("Failed to generate itinerary.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStateChange = (selectedOption) => {
    setState(selectedOption.value);
    setCity(""); // Clear selected city when state changes
  };

  const handleCityChange = (selectedOption) => {
    setCity(selectedOption.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Travel AI Generator</h1>

      {/* State Dropdown */}
      <Select
        options={states}
        onChange={handleStateChange}
        placeholder="Select state"
        className="mb-4"
      />

      {/* City Dropdown */}
      {state && (
        <Select
          options={usaCities[state].map((city) => ({ value: city, label: city }))}
          onChange={handleCityChange}
          placeholder="Select city"
          className="mb-4"
        />
      )}

      {/* Number of days input */}
      <input
        type="number"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        placeholder="Number of days"
        className="px-4 py-2 border rounded mb-4"
      />

      {/* Generate button */}
      <button
        onClick={generateItinerary}
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate My Trip"}
      </button>

      {/* Error message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Itinerary Display */}
      {itinerary && <div className="mt-4">{itinerary}</div>}
    </div>
  );
}