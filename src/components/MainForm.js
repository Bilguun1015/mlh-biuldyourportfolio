import React, { useState } from 'react';
import axios from 'axios';

import SpotForm from './SpotForm';

function MainForm(props) {
  const createTourAPI = 'https://arcane-atoll-68110.herokuapp.com/tours/create';
  const { visible, goForward, goBackward } = props;
  console.log(visible);

  const [tourData, setTourData] = useState({
    tour_description: '',
    tour_name: '',
    user_id: '',
    stops: [],
  });

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(createTourAPI, tourData);

    console.log(response);
  };

  const onInputChange = (e) => {
    const { value, name } = e.target;
    setTourData({
      ...tourData,
      [name]: value,
    });
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
          />
        </div>
        <div className='form__box'>
          <label>Tour Name </label>
          <input
            className='input'
            name='tour_name'
            defaultValue={tourData.tour_name}
            onChange={onInputChange}
          />
        </div>
        <div className='form__box long'>
          <label>Tour Description </label>
          <textarea
            className='input'
            name='tour_description'
            defaultValue={tourData.tour_description}
            onChange={onInputChange}
          />
        </div>
        <div className='btn-box'>
          <a href='#' className='btn' onClick={goBackward}>
            &larr; Back
          </a>
          <a
            href='#'
            onClick={onFormSubmit}
            className='btn'
            onClick={goForward}
          >
            Next &rarr;
          </a>
        </div>
      </form>

      <SpotForm
        tourData={tourData}
        setTourData={setTourData}
        visible={visible}
        goForward={goForward}
        goBackward={goBackward}
      />
    </div>
  );
}

export default MainForm;
