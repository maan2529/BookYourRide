const axios = require('axios');

const getAddressCoordinate = async function (address) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_PUBLIC_KEY}&limit=1`;

    try {
        const response = await axios.get(url);

        if (response.data && response.data.features && response.data.features.length > 0) {
            const location = response.data.features[0];
            const [lng, lat] = location.geometry.coordinates;
            console.log(lng, lat)
            return { lat, lng };
        } else {
            throw new Error("No results found");
        }

    } catch (error) {
        console.error("Mapbox error:", error.response?.data || error.message);
        throw new Error("Unable to fetch location");
    }
};

const getTimeAndDistance = async function (origin, destination) {

    const origin_cordinates = await getAddressCoordinate(origin);
    const origin_lon = origin_cordinates.lng
    const origin_lat = origin_cordinates.lat

    console.log("origin", origin_cordinates)

    const destination_cordinates = await getAddressCoordinate(destination);

    const destination_lon = destination_cordinates.lng
    const destination_lat = destination_cordinates.lat

    console.log("destination", destination_cordinates)

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin_lon},${origin_lat};${destination_lon},${destination_lat}?access_token=${process.env.MAPBOX_PUBLIC_KEY}&geometries=geojson`;

    try {
        const response = await axios.get(url)
        // console.log("response ->", response.data)
        return response.data;
    } catch (error) {
        throw Error(error)
    }

}


module.exports = { getAddressCoordinate, getTimeAndDistance };
