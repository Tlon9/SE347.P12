export const getToday = () => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
  };

    // Function to fetch locations data
export const fetchAreas = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8008/hotels/searchInfo/", {
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

  // Function to fetch hotels data
export const fetchHotels = async (url, offset, limit, selectedSortType) => {
    url = new URL(url);
    const searchParams = new URLSearchParams(url.search);
    const urlRequest = `http://127.0.0.1:8008/hotels/results?area=${searchParams.get("location")}&offset=${offset}&limit=${limit}`;
    try {
    const response = await fetch(urlRequest, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        const data = await response.json();
        return data; // Return the fetched data
    } else {
        throw new Error(`Error fetching hotels: ${response.statusText}`);
    }
    } catch (error) {
    console.error("Error in fetchHotels:", error);
    throw error; // Re-throw error for handling in the component
    }
};


  // Function to fetch hotels data
export const fetchRooms = async (url) => {
    url = new URL(url);
    const searchParams = new URLSearchParams(url.search);
    const checkInDate = searchParams.get("checkInDate").split("-").reverse().join("-");
    const checkOutDate = searchParams.get("checkOutDate").split("-").reverse().join("-");
    const urlRequest = `http://127.0.0.1:8008/hotels/results_room?Hotel_id=${searchParams.get("hotelID")}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;
    try {
    const response = await fetch(urlRequest, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        const data = await response.json();
        return data; // Return the fetched data
    } else {
        throw new Error(`Error fetching hotels: ${response.statusText}`);
    }
    } catch (error) {
    console.error("Error in fetchHotels:", error);
    throw error; // Re-throw error for handling in the component
    }
};