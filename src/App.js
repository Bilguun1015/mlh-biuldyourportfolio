// import Maps from './components/Maps';
import React, { useState } from 'react';

import MainForm from './components/MainForm';
import logo from './img/mlh-logo.png';
import './App.css';

function App() {
  const [visible, setVisible] = useState(1);
  const goForward = () => {
    setVisible(visible + 1);
  };
  const goBackward = () => {
    setVisible(visible - 1);
  };

  return (
    <div className='container'>
      <header className='header'>
        <img src={logo} alt='tourtellini logo' class='logo' />
        <h1 className='heading-primary'>Tourtellini</h1>
      </header>
      <main className={visible === 1 ? 'main visible' : 'main invisible'}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          augue enim, bibendum nec rhoncus eu, hendrerit blandit velit. Nunc
          varius laoreet libero. Morbi sed mollis erat. Sed volutpat interdum
          sapien, in pharetra turpis cursus sit amet. Nam est massa, auctor eget
          lacinia sed, semper vel risus. Curabitur ut est vel tellus efficitur
          rutrum. Duis fringilla turpis nibh, quis placerat sem sollicitudin id.
        </p>
        <a class='btn' onClick={goForward}>
          Build your tour &rarr;
        </a>
      </main>
      <MainForm
        visible={visible}
        goForward={goForward}
        goBackward={goBackward}
      />
    </div>
  );
}

export default App;
