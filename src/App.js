// import Maps from './components/Maps';
import React, { useState } from 'react';

import MainForm from './components/MainForm';
import logo from './img/mlh-logo.png';
import './App.css';

function App() {
  //visible sets the visibile and invisible classnames
  const [visible, setVisible] = useState(1);

  //goes between the diffferent form views
  const goForward = () => {
    setVisible(visible + 1);
  };
  const goBackward = () => {
    if (visible !== 1) {
      setVisible(visible - 1);
    }
  };

  return (
    <div className={visible === 1 ? 'container small' : 'container big'}>
      <div id='autocomplete'></div>
      <header className='header'>
        <img src={logo} alt='tourtellini logo' className='logo' />
        <h1 className='heading-primary'>Tourtellini</h1>
      </header>
      <main className={visible === 1 ? 'main visible' : 'main invisible'}>
        <p>
          Professional development is a lot about setting goals and finding your
          way to your destination. Whether it is first day of classes in a new
          building on a part of campus you have never been to, or a job
          interview, making it there, and being early, are part of the
          preparation and expectations we set for ourselves, and each other.
          Being late or getting lost is a poor way of making a first impression,
          and not a habit that anyone wants to be associated with. Never get
          lost on campus, or in life, again.
        </p>
        <button className='btn' onClick={goForward}>
          Build your tour &rarr;
        </button>
      </main>
      <MainForm
        visible={visible}
        goForward={goForward}
        goBackward={goBackward}
        setVisible={setVisible}
      />
    </div>
  );
}

export default App;
