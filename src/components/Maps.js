import React from 'react';
import {
  GoogleMap,
  LoadScript,
  OverlayView,
  DirectionsService,
} from '@react-google-maps/api';

const containerStyle = {
  height: '100vw',
  width: '100vw',
};

const center = {
  lat: 35.772,
  lng: -120.214,
};

const onClick = (e) => {
  console.log(e);
};

const divStyle = {
  background: 'white',
  border: '1px solid #ccc',
  padding: 15,
};

function Maps() {
  return (
    <LoadScript googleMapsApiKey='AIzaSyBNLrJhOMz6idD05pzfn5lhA-TAw-mAZCU'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={onClick}
      >
        <OverlayView
          position={center}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div style={divStyle}>
            <h1>OverlayView</h1>

            {/* <button onClick={onClick} type='button'>
              Click me
            </button> */}
          </div>
        </OverlayView>
      </GoogleMap>
    </LoadScript>
  );
}

export default Maps;
