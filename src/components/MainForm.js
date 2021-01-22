import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SpotForm from './SpotForm';

function MainForm() {
  const createTourAPI = 'https://arcane-atoll-68110.herokuapp.com/tours/create';

  const [tourData, setTourData] = useState({
    tour_description: '',
    tour_name: '',
    user_id: '',
    stops: [],
  });

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(tourData);
  };

  const onInputChange = (e) => {
    const { value, name } = e.target;
    setTourData({
      ...tourData,
      [name]: value,
    });
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <label>Your name </label>
        <input
          name='user_id'
          defaultValue={tourData.user_id}
          onChange={onInputChange}
          placeholder='name...'
        />
        <label>Tour Name </label>
        <input
          name='tour_name'
          defaultValue={tourData.tour_name}
          onChange={onInputChange}
          placeholder='tour name...'
        />
        <label>Tour Description </label>
        <input
          name='tour_description'
          defaultValue={tourData.tour_description}
          onChange={onInputChange}
          placeholder='tour description...'
        />
        <button type='submit'>send</button>
      </form>

      <SpotForm tourData={tourData} setTourData={setTourData} />
    </>
  );
}

export default MainForm;

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
