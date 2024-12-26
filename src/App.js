import './App.css';
import rouletteImage from './roulette_img.png';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const handleScreenclick = () => {
    navigate('/stacked-tab'); // Navigate to the stacked-tab route
  };

  return (
    <div className="App" onClick={handleScreenclick}>  {/* Make the whole page clickable */}
      <header className="App-header">
        <img src={rouletteImage} className="App-logo" alt="roulette logo" />
        <p className="App-text">Touch to continue</p>
      </header>
    </div>
  );
}

export default App;



