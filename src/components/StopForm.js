import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement('script');
  script.type = 'text/javascript';

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ['geocode'] }
  );
  autoComplete.setFields([
    'address_components',
    'formatted_address',
    'geometry',
  ]);
  autoComplete.addListener('place_changed', () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  const lat = addressObject.geometry.location.lat();
  const lng = addressObject.geometry.location.lng();
  updateQuery({ address: query, lat: lat, lng: lng });
  console.log(addressObject);
}

const SpotForm = (props) => {
  // variables and props
  const autoCompleteRef = useRef(null);
  const { tourData, setTourData, visible, goBackward, setVisible } = props;
  const createTourAPI = 'https://arcane-atoll-68110.herokuapp.com/tours/create';
  // component state
  const [stopData, setStopData] = useState({
    stop_number: 0,
    name: '',
    user_comment: '',
  });

  const [query, setQuery] = useState({
    address: '',
    lat: 0,
    lng: 0,
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_JS_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  // setting input into state
  const onInputChange = (e) => {
    const { value, name } = e.target;
    setStopData({
      ...stopData,
      [name]: value,
    });
  };

  // building final object to submit to backend
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      stop_number: stopData.stop_number,
      name: stopData.name,
      lat: query.lat,
      lng: query.lng,
      address: query.address,
      user_comment: stopData.user_comment,
    };

    setTourData({ ...tourData, stops: [...tourData.stops, newData] });
    setStopData({ ...stopData, stop_number: stopData.stop_number + 1 });
  };

  //POST request and if successful back to the main page
  const submitTour = async () => {
    const response = await axios.post(createTourAPI, tourData);
    if (response.status === 200) {
      //resetting all the states
      setError(false);
      setStopData({
        stop_number: 0,
        name: '',
        user_comment: '',
      });
      setQuery({
        address: '',
        lat: 0,
        lng: 0,
      });
      setTourData({
        tour_description: '',
        tour_name: '',
        user_id: '',
        stops: [],
      });
      setVisible(1);
    } else {
      setError(true);
    }
  };

  const displayStops = () => {
    return tourData.stops.map((stop, i) => {
      return (
        <span className='stop' key={i}>
          {stop.name}&rarr;
        </span>
      );
    });
  };

  return (
    <div
      className={visible === 3 ? 'stop-container slide-up' : 'stop-container'}
    >
      <h2 className='secondary-heading'>
        Add stops to <span className='tour-name'>{tourData.tour_name}</span>
      </h2>
      <form onSubmit={onFormSubmit} className='form stop-form'>
        <div className='form__box'>
          <label>Stop name</label>
          <input
            className='input'
            name='name'
            value={stopData.name}
            onChange={onInputChange}
            placeholder='required'
          ></input>
        </div>
        <div className='form__box'>
          <label>Stop address</label>
          <input
            className='input'
            ref={autoCompleteRef}
            onChange={(event) =>
              setQuery({ ...query, address: event.target.value })
            }
            placeholder='required'
            value={query.address}
          />
        </div>
        <div className='form__box long'>
          <label>Stop comment</label>
          <textarea
            maxLength='300'
            className='input'
            name='user_comment'
            value={stopData.user_comment}
            onChange={onInputChange}
          ></textarea>
        </div>
      </form>
      <div className='btn-box'>
        <button className='btn' onClick={goBackward}>
          &larr; Back
        </button>
        <button
          onClick={onFormSubmit}
          className='btn'
          disabled={stopData.name && query.address ? false : true}
        >
          Add a stop
        </button>
      </div>
      <div className='stops'>
        {tourData.stops.length ? (
          <div>
            <h2>Added stops </h2> {displayStops()}
            <button onClick={submitTour} className='btn'>
              Submit tour
            </button>
          </div>
        ) : null}
      </div>
      {error ? <p>Something wrong happened. Try again..</p> : null}
    </div>
  );
};

export default SpotForm;
