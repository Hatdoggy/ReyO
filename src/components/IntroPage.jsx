import { useEffect } from 'react';
import { mouseScrollAnim } from '../scrollFunctions';
import { motion } from "motion/react";
import { CircleArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';


function Intro() {
  gsap.registerPlugin(ScrollToPlugin);

  // This messes up the fact that the intro is the first one to show up
  function scrollDown() {
    gsap.to(window, {
      scrollTo: {
        y: "#introTxt", // Ensure this targets the correct element
        autoKill: true, // Stops scrolling if the user interacts
      },
      duration: 2.5, // Duration of the scroll
      ease: "power2.inOut", // Smooth easing function
    });
  }

  useEffect(() => {
    const introTxt = document.getElementById('intro');
    const navbars = document.querySelectorAll('[data-id="intro"]');
    if (!introTxt.classList.contains('actv')) {
      mouseScrollAnim(introTxt, navbars);
    }
  }, [])

  return (
    <section className="pos-rel w-vw h-vh bg-org flx" id="intro">
      <div className="flx flx-col flx-ai-ce flx-jc-ce m-l-auto m-r-auto m-b-auto m-t-auto">
        <motion.h1 initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="pay txt-al-ce headTxt txt-lght">BALL OF FISH</motion.h1>
        <motion.p initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }} className="gud med txt-al-ce w-50 m-t-1 txt-lght">Welcome! This is a somewhat not so fish themed portfolio website that showcases my skills and such. Hope you enjoy!</motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="m-t-5 txt-lght one"
        >
          <CircleArrowDown
            size={64}
            id="movedown"
            onClick={scrollDown}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default Intro