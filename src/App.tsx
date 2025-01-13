import { useState } from 'react'
import './App.css'
import Home from './components/Home';
import Base64 from './components/Base64';
import Localize from './components/Localize';
import JWT from './components/JWT';

enum sections {
  "home",
  "base64",
  "local",
  "jwt"
}

function App() {
  const [section, setSection] = useState<sections>(sections.home);

  return (
    <>
      <div className='header'>
        <button className='menu-button' onClick={() => setSection(sections.home)}>Home</button>
        <button className='menu-button' onClick={() => setSection(sections.base64)}>Base64 Encode/Decode</button>
        <button className='menu-button' onClick={() => setSection(sections.jwt)}>JWT Decode</button>
        <button className='menu-button' onClick={() => setSection(sections.local)}>PsuedoLocalization Generator</button>
      </div>
      {section === sections.home && <Home />}
      {section === sections.base64 && <Base64 />}
      {section === sections.local && <Localize />}
      {section === sections.jwt && <JWT />}
    </>
  )
}

export default App
