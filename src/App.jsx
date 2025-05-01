// Components
import IntroPage from './components/IntroPage.jsx';
import ProjectDesc from './components/ProjectDesc.jsx';
import Skills from './components/Skills.jsx';
import MainIntro from './components/MainIntro.jsx';
import Portfolio from './components/Portfolio.jsx';
import Showcase from './components/Showcase.jsx';
import VertNav from './components/Navigation.jsx';

// Import stuffs
import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

function App() {

  gsap.registerPlugin(ScrollTrigger);
  const [reviewed,setReview] = useState({
    choice:undefined,
    rev:0,
    clk:0
  });

  // For display of specific portfolio element
  /*
    This triggers the showing of the popup containing the elements including 
    the name and other stuffs

    flow is: Title of element - provide btn to move to actual display of element
  */
  const [show, setShow] = useState({
    text: undefined,
    display: 0,
    srcData: undefined,
    selectPortf:{
      show:0,
      thumbs:undefined,
      target:undefined,
    },
  });

  const [selected, setSelected] = useState(0);

  return (
    <main className="pos-rel w-vw flx flx-col">
      {show.display ? <Showcase show={show} setShow={setShow}/> : undefined}
      <VertNav  sel={selected} setSel={setSelected} show={show} setShow={setShow}/>
      <IntroPage />
      <MainIntro />
      <Skills />
      <Portfolio clkShow={setShow} showval={show} sel={selected} setSel={setSelected}/>
      <ProjectDesc reviewed={reviewed} setReview={setReview}/>
    </main>
  )
}

export default App
