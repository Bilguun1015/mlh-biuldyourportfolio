import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpotForm = (props) => {
  // variables and props
  const { tourData, setTourData } = props;
  const { REACT_APP_GOOGLE_KEY } = process.env;
  const geocodeAPI = 'https://maps.googleapis.com/maps/api/geocode/json?';

  // component state
  const [stopData, setStopData] = useState({
    stop_number: 0,
    name: '',
    lat: 73.23321,
    lng: -123.32521,
    address: '123 Coffee Lane, NY, NY ZIPCODE',
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
    const result = await axios.get(
      `${geocodeAPI}address=${stopData.address}&key=${REACT_APP_GOOGLE_KEY}`
    );
    const { data } = result;
    console.log(data);
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <input
          name='address'
          defaultValue={stopData.address}
          onChange={onInputChange}
          placeholder='address'
        ></input>
        <button type='submit'>Add a spot</button>
      </form>
      <button>Submit your tour</button>
    </>
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
