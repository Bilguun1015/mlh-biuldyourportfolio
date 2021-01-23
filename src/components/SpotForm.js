import React, { useState } from 'react';
import axios from 'axios';

const SpotForm = (props) => {
  // variables and props
  const geocodeAPI = 'https://maps.googleapis.com/maps/api/geocode/json?';
  const { tourData, setTourData, visible, goBackward, submitTour } = props;
  // component state
  const [stopData, setStopData] = useState({
    stop_number: 0,
    name: '',
    address: '',
    user_comment: '',
  });

  // setting input into state
  const onInputChange = (e) => {
    const { value, name } = e.target;
    setStopData({
      ...stopData,
      [name]: value,
    });
  };

  // axios call to get longitude and latitude from Google geocaode API
  const onFormSubmit = async (e) => {
    e.preventDefault();
    // axios call to the Google APi to get the lat and lng

    const result = await axios.get(
      `${geocodeAPI}address=${stopData.address}&key=${process.env.REACT_APP_GOOGLE_KEY}`
    );
    const { geometry, formatted_address } = result.data.results[0];
    // build up the data from succesful call

    const newData = {
      stop_number: stopData.stop_number,
      name: stopData.name,
      lat: geometry.location.lat,
      lng: geometry.location.lng,
      address: formatted_address,
      user_comment: stopData.user_comment,
    };

    setTourData({ ...tourData, stops: [...tourData.stops, newData] });
    setStopData({ ...stopData, stop_number: stopData.stop_number + 1 });
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
      <h2 className='heading-secondary'>Add a stop to {tourData.tour_name}</h2>
      <form onSubmit={onFormSubmit} className='form stop-form'>
        <div className='form__box'>
          <label>Stop name</label>
          <input
            className='input'
            name='name'
            defaultValue={stopData.name}
            onChange={onInputChange}
            required
          ></input>
        </div>
        <div className='form__box'>
          <label>Stop address</label>
          <input
            className='input'
            name='address'
            defaultValue={stopData.address}
            onChange={onInputChange}
            required
          ></input>
        </div>
        <div className='form__box long'>
          <label>Stop comment</label>
          <textarea
            className='input'
            name='user_comment'
            defaultValue={stopData.user_comment}
            onChange={onInputChange}
          ></textarea>
        </div>
        <div className='btn-box'>
          <a href='#' className='btn' onClick={goBackward}>
            &larr; Back
          </a>
          <a href='#' onClick={onFormSubmit} className='btn'>
            Add a spot
          </a>
        </div>
      </form>
      <div className='stops'>
        {tourData.stops.length ? (
          <div>
            <h2>Added stops </h2> {displayStops()}
            <a href='#' onClick={submitTour} className='btn'>
              Submit tour
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SpotForm;
