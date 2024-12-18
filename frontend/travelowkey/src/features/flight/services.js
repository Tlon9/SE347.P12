// Utility to get today's date in the required format
export const getToday = () => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
  };
  
  // Function to fetch locations data
export const fetchLocations = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/flights/searchInfo/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
        const data = await response.json();
        return data; // Return the fetched data
        } else {
        throw new Error(`Error fetching locations: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error in fetchLocations:", error);
        throw error; // Re-throw error for handling in the component
    }
};


  // Function to fetch flights data
export const fetchFlights = async (url) => {
    url = new URL(url);
    const searchParams = new URLSearchParams(url.search);
    const payload = {
        departure: searchParams.get("from"),
        destination: searchParams.get("to"),
        seatClass: searchParams.get("seatType"),
        passengers: searchParams.get("passengerCount"),
    }
    console.log(payload);
    const urlRequest = `http://127.0.0.1:8000/flights/results?departure=${searchParams.get("from")}&destination=${searchParams.get("to")}&date=${searchParams.get("date")}&seatClass=${searchParams.get("seatType")}&passengers=${searchParams.get("passengerCount")}`;
    try {
    const response = await fetch(urlRequest, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        const data = await response.json();
        return data; // Return the fetched data
    } else {
        throw new Error(`Error fetching flights: ${response.statusText}`);
    }
    } catch (error) {
    console.error("Error in fetchFlights:", error);
    throw error; // Re-throw error for handling in the component
    }
};