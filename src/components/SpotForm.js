import React, { useState } from 'react';
import axios from 'axios';

const SpotForm = (props) => {
  // variables and props
  const geocodeAPI = 'https://maps.googleapis.com/maps/api/geocode/json?';
  const { tourData, setTourData } = props;

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
    // console.log(geometry.location.lat, formatted_address);
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

  return (
    <div className='stop-container'>
      <h2 className='heading-secondary'>Add a stop</h2>
      <form onSubmit={onFormSubmit} className='form stop-form'>
        <label>Spot address</label>

        <input
          name='name'
          defaultValue={stopData.name}
          onChange={onInputChange}
          placeholder='name'
          required
        ></input>
        <input
          name='address'
          defaultValue={stopData.address}
          onChange={onInputChange}
          placeholder='address'
          required
        ></input>
        <input
          name='user_comment'
          defaultValue={stopData.user_comment}
          onChange={onInputChange}
          placeholder='comment'
        ></input>
        <button type='submit'>Add a stop</button>
      </form>
    </div>
  );
};

export default SpotForm;

// tour_data = {'tour_description': 'A tour of my favorite city, TownTown!', 'tour_name': 'TownTown Tour', 'user_id': 'liam', 'stops': [
//   {
//           stop_number: 0
//           name: Starbucks
//           lat: 73.23321
//           lng: -123.32521
//           address: 123 Coffee Lane, NY, NY ZIPCODE
//           user_comment: “This is my favorite starbucks and I have lots of good memories of their coffee”
//       }
//       {
//           stop_number: 1
//           name: MLH Park
//           lat: 73.42313
//           lng: -123.501023
//           address: 555 Hacker St, NY, NY ZIPCODE
//           user_comment: "This is where I did my first hackathon, it was lots of fun."
//       }
// ]}
