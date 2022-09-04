import './App.css';
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// get data
import res1 from "./data/response1.json";
import res2 from "./data/response2.json";
import res3 from "./data/response3.json";

// data
// const data = 

// set google
const google = window.google




function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [destination, setDestination] = useState({ lat: 41.756795, lng: -78.954298 });
  const [origin, setOrigin] = useState({ lat: 40.756795, lng: -73.954298 });
  const [loc, setLoc] = useState({ lat: 40.756795, lng: -73.954298 });
  const [data, setData] = useState([res1?.result, res2?.result, res3?.result]);
  // 




  const apiIsLoaded = (map, maps) => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // const origin = { lat: 40.756795, lng: -73.954298 };
    // let origin_ = origin;
    // let destination_ = destination;
    // const destination = { lat: 41.756795, lng: -78.954298 };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };


  // change route on map
  const changeRoute = (index) => {
    // 
    let start = data.filter((v, k) => k === index)[0][0];
    let end = data.filter((v, k) => k === index)[0][data.filter((v, k) => k === index)[0]?.length - 1];
    // 
    let lats = 0; let lngs = 0;
    let late = 0; let lnge = 0;
    // 
    if (start?.['position.latitude'] && start?.['position.longitude'] && end?.['position.latitude'] && end?.['position.longitude']) {
      lats = start?.['position.latitude']; lngs = start?.['position.longitude'];
      late = end?.['position.latitude']; lnge = end?.['position.longitude'];
    }
    else if (start?.['data.Latitude'] && start?.['data.Longitude'] && end?.['data.Latitude'] && end?.['data.Longitude']) {
      lats = start?.['data.Latitude']; lngs = start?.['data.Longitude'];
      late = end?.['data.Latitude']; lnge = end?.['data.Longitude'];
    }
    else {
      // when data is not right.. 
    }
    window.location.href = `/?lats=${lats}&lngs=${lngs}&late=${late}&lnge=${lnge}`;
  }


  useEffect(() => {
    // apiIsLoaded();
    // 
    // console.log(data);
    // 
    // console.log(searchParams.get("lats"));
    let ls = parseFloat( searchParams.get("lats") ); let los = parseFloat( searchParams.get("lngs") );
    let le = parseFloat( searchParams.get("late") ); let loe = parseFloat( searchParams.get("lnge") );
    setOrigin({ ...origin, lat: ls, lng: los });
    setDestination({ ...destination, lat: le, lng: loe });
  }, []);



  return (
    <div className="App">

      <div style={{
        display: "flex", flexDirection: "row", padding: "1em"
      }} >
        {
          data && data.length > 0 && data.map((res, index) => (
            <div key={index} style={{ marginRight: ".5em" }} >
              <button onClick={() => changeRoute(index)} style={{
                paddingLeft: "1em", paddingRight: "1em", cursor: "pointer"
              }} >
                {index + 1}
              </button>
            </div>
          ))
        }
      </div>


      {/* map | starts */}
      <div style={{ height: "400px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "Your_API_KEY"
          }}
          defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
          defaultZoom={10}
          center={loc}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
        />
      </div>
      {/* map | ends */}

    </div>
  );
}

export default App;
