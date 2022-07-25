import './App.css';

import { Header } from './components/Header/Header';
import { Inputs } from './components/Inputs/Inputs';
import { TranslateButton } from "./components/TranslateButton/TranslateButton";
import { ChangeText } from "./components/ChangeText/ChangeText"

function App() {
  return (
    <div className="App">
      <div className="Wrapper Container">
        <Header />
        <ChangeText />
        <Inputs />
        <TranslateButton />
      </div>
    </div>
  );
}

export default App;
