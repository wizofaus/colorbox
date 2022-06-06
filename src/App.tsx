import './App.css';
import Colorbox from './Colorbox';

function App() {
  return (
    <div className="Colorbox">
      <header className="App-header">
        <p>A colorbox at 128 x 256</p>        
        <Colorbox width="128" height="256"/>
        <p>A colorbox at 256 x 128</p>        
        <Colorbox width="256" height="128"/>
        <p>A colorbox at 1024 x 32!</p>        
        <Colorbox width="1024" height="32"/>
      </header>

    </div>
  );
}

export default App;
