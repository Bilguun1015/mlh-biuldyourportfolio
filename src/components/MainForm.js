import React, { useState } from 'react';
import axios from 'axios';

import SpotForm from './SpotForm';

function MainForm(props) {
  const createTourAPI = 'https://arcane-atoll-68110.herokuapp.com/tours/create';
  const { visible, setVisible, goForward, goBackward } = props;

  const [tourData, setTourData] = useState({
    tour_description: '',
    tour_name: '',
    user_id: '',
    stops: [],
  });

  const onFormSubmit = (e) => {
    e.preventDefault();
    goForward();
  };

  const onInputChange = (e) => {
    const { value, name } = e.target;
    setTourData({
      ...tourData,
      [name]: value,
    });
  };

  const submitTour = async () => {
    const response = await axios.post(createTourAPI, tourData);
    console.log(response);
    if (response.status === 200) {
      setVisible(1);
    }
  };

  return (
    <div className='form-container'>
      <form
        className={
          visible === 2 ? 'form main-form visible' : 'form main-form invisible'
        }
      >
        <h2 className='secondary-heading'>Tour info</h2>
        <div className='form__box'>
          <label>Your name </label>
          <input
            className='input'
            name='user_id'
            defaultValue={tourData.user_id}
            onChange={onInputChange}
            placeholder='required...'
          />
        </div>
        <div className='form__box'>
          <label>Tour Name </label>
          <input
            className='input'
            name='tour_name'
            defaultValue={tourData.tour_name}
            onChange={onInputChange}
            placeholder='required...'
          />
        </div>
        <div className='form__box long'>
          <label>Tour Description </label>
          <textarea
            className='input'
            name='tour_description'
            defaultValue={tourData.tour_description}
            onChange={onInputChange}
            placeholder='required...'
          />
        </div>
      </form>
      <div className={visible === 2 ? 'btn-box visible' : 'btn-box invisible'}>
        <button className='btn' onClick={goBackward}>
          &larr; Back
        </button>
        <button
          onClick={onFormSubmit}
          className='btn'
          disabled={
            tourData.user_id && tourData.tour_name && tourData.tour_description
              ? false
              : true
          }
        >
          Next &rarr;
        </button>
      </div>

      <SpotForm
        tourData={tourData}
        setTourData={setTourData}
        visible={visible}
        goForward={goForward}
        goBackward={goBackward}
        submitTour={submitTour}
      />
    </div>
  );
}

export default MainForm;
