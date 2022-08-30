import { characterData } from './data/characters';
import Header from './components/Header/Header';
import TeamDisplay from './components/Squad/Squad';

function App() {
  const data = characterData;
  return (
    <>
      <Header />
      <TeamDisplay />
    </>
  );
}

export default App;
