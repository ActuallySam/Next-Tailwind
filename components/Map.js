import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {

    const [selectedLocation, setSelectedLocation] = useState({});

    // Transform the search resukts object into the 
    // { latitude: 52.6768, longitude: 13.7262 }
    // object
    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }));
    console.log(coordinates);

    // The latitude and longitude of the center of location coords
    const center = getCenter(coordinates);
    console.log(center);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return (
        <ReactMapGL mapStyle="mapbox://styles/sammy910/cksgcxlm1esut18qq4zo02vsx"
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport} 
        onViewportChange={(nextViewport) => setViewport(nextViewport)}>
            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10} >
                            <p onClick={() => setSelectedLocation(result)} className="cursor-pointer text-2xl animate-bounce" aria-label="push-pin">📌</p>
                    </Marker>

                    {/* The popup that should show if we click a Marker */}
                    {selectedLocation.long === result.long ? (
                        <Popup 
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long} >
                                {result.title}
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map;
