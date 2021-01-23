// import Maps from './components/Maps';
import MainForm from './components/MainForm';
import logo from './img/mlh-logo.png';
import './App.css';
import { logDOM } from '@testing-library/react';

function App() {
  const onButtonClick = (e) => {
    return;
  };
  return (
    <div className='container'>
      <header className='header'>
        <img src={logo} alt='tourtellini logo' class='logo' />
        <h1 className='heading-primary'>Tourtellini</h1>
      </header>
      <main className='main'>
        <p class='paragraph'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          augue enim, bibendum nec rhoncus eu, hendrerit blandit velit. Nunc
          varius laoreet libero. Morbi sed mollis erat. Sed volutpat interdum
          sapien, in pharetra turpis cursus sit amet. Nam est massa, auctor eget
          lacinia sed, semper vel risus. Curabitur ut est vel tellus efficitur
          rutrum. Duis fringilla turpis nibh, quis placerat sem sollicitudin id.
        </p>
        <a href='#' class='btn' onClick={onButtonClick}>
          Build your tour &rarr;
        </a>
      </main>
      <MainForm />
    </div>
  );
}

export default App;
