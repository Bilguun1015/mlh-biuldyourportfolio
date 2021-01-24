import React, { useState } from 'react';

import SpotForm from './StopForm';

function MainForm(props) {
  // Backend URL and props

  const { visible, setVisible, goForward, goBackward } = props;

  //component state
  const [tourData, setTourData] = useState({
    tour_description: '',
    tour_name: '',
    user_id: '',
    stops: [],
  });

  //go to stop form
  const onFormSubmit = (e) => {
    e.preventDefault();
    goForward();
  };

  //set state with the input
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
            value={tourData.user_id}
            onChange={onInputChange}
            placeholder='required...'
          />
        </div>
        <div className='form__box'>
          <label>Tour Name </label>
          <input
            className='input'
            name='tour_name'
            value={tourData.tour_name}
            onChange={onInputChange}
            placeholder='required...'
          />
        </div>
        <div className='form__box long'>
          <label>Tour Description </label>
          <textarea
            className='input'
            name='tour_description'
            value={tourData.tour_description}
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
        setVisible={setVisible}
      />
    </div>
  );
}

export default MainForm;
