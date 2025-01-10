import { useState } from 'react'
import './App.css'
import Home from './components/Home';
import Base64 from './components/Base64';
import Localize from './components/Localize';

enum sections {
  "home",
  "base64",
  "local"
}

function App() {
  const [section, setSection] = useState<sections>(sections.home);

  return (
    <>
      <div className='header'>
        <button onClick={() => setSection(sections.home)}>Home</button>
        <button onClick={() => setSection(sections.base64)}>Base64</button>
        <button onClick={() => setSection(sections.local)}>PsuedoLocalization</button>
      </div>
      {section === sections.home && <Home />}
      {section === sections.base64 && <Base64 />}
      {section === sections.local && <Localize />}
    </>
  )
}

export default App
