const NodeGeocoder = require("node-geocoder");
const geoip = require("geoip-lite");

export default async function handler(req: any, res: any) {
  const location_iq_api = process.env.REACT_APP_LOCATION_IQ_API;

  // Step 2: Get city name
  async function getCity(coordinates: any): Promise<string> {
    const lat = coordinates[0];
    const lng = coordinates[1];

    const options = {
      provider: "google",
      httpAdapter: "https", // Default
      apiKey: location_iq_api, // for Mapquest, OpenCage, Google Premier
      formatter: "json", // 'gpx', 'string', ...
    };

    const geocoder = NodeGeocoder(options);

    const responseData = await geocoder.reverse({ lat: lat, lon: lng });

    let currentCityName = JSON.stringify(responseData[0].city);

    return currentCityName;
  }

  switch (req.method) {
    case "GET": {
      const quertData = req.query;

      const lat = quertData.lat;
      const lng = quertData.lng;
      const useIPA: boolean = JSON.parse(quertData.useIPA);

      const coordinates = [lat, lng];

      let currentCityName = "";

      if (!useIPA) {
        currentCityName = await getCity(coordinates);
      } else {
        console.log(req.socket.localAddress);
        const geo = geoip.lookup("103.255.6.109");

        currentCityName = geo.city;
        console.log(geo.city);
      }

      res.status(200).json(currentCityName);
      // res.status(200).json("API Working");

      break;
    }

    default: {
      res.status(404).json("Req Not Found");
      break;
    }
  }
}
