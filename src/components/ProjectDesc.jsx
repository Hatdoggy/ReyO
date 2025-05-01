import { useEffect, useState } from 'react';
import { mouseScrollAnim } from '../scrollFunctions';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { createTheme } from '@mui/material/styles';
import Reviewpop from './Reviewpop.jsx';

import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import db from '../assets/firebase';


const theme = createTheme({
  palette: {
    icons: {
      main: '#FB6918',
      light: '#FFE0A4',
      dark: '#222222',
      contrastText: '#FFF',
    },
  },
});

function openlink(url) {
  window.open(url, '_blank');
}

function Desc(props) {

  const { reviewed, setReview } = props;
  const [currevs, setcurrevs] = useState({
    "happy": 0,
    "sad": 0,
    "angry": 0
  })

  useEffect(() => {
    const introTxt = document.getElementById('reviewcont');
    const navbars = document.querySelectorAll('[data-id="reviewcont"]');

    if (!introTxt.classList.contains('actv')) {
      mouseScrollAnim(introTxt, navbars);
    }

    const unsubscribe = onSnapshot(collection(db, 'reviews'), (snapshot) => {
      const reviewsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      const feedbackCounts = {
        happy: 0,
        sad: 0,
        angry: 0,
      };

      reviewsData.forEach((elem) => {
        feedbackCounts[elem.feedback] += 1;
      });

      // Update the state with the new counts
      setcurrevs((prevState) => ({
        ...prevState,
        ...feedbackCounts,
      }));
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [])

  // Handles review click
  const handleFeedback = async (feedback) => {

    if (!reviewed.clk) {
      try {
        await addDoc(collection(db, 'reviews'), {
          feedback, // Store the feedback (e.g., "angry", "happy", "sad")
          timestamp: new Date(), // Add a timestamp
        });
        setReview({
          choice: feedback,
          rev: 1,
          clk: 1
        });
      } catch (error) {
        console.error('Error submitting feedback:', error);
      }
    }
  };

  return (
    <section className="pos-rel w-vw h-vh bg-drk flx" id="reviewcont">

      {reviewed.rev && <Reviewpop reviewed={reviewed} setReview={setReview} />}

      <div className="flx flx-col flx-ai-ce m-l-auto m-r-auto m-b-auto m-t-auto">

        <div className='flx flx-ai-ce flx-jc-ce w-100' id='reviews'>
          <div data-value="angry" onClick={() => handleFeedback('angry')} className='flx flx-ai-ce flx-jc-ce fishcontainer ang'>
            <img src='./fish/ang1.png' alt='angry' />
          </div>
          <div data-value="happy" onClick={() => handleFeedback('happy')} className='flx flx-ai-ce flx-jc-ce fishcontainer hap'>
            <img src='./fish/hap1.png' alt='happy' />
          </div>
          <div data-value="sad" onClick={() => handleFeedback('sad')} className='flx flx-ai-ce flx-jc-ce fishcontainer sad'>
            <img src='./fish/sad1.png' alt='sad' />
          </div>
        </div>

        <h2 className="pay txt-al-ce title txt-org m-t-2">REVIEWS</h2>
        <p className="gud med txt-al-ce w-50 m-t-1 txt-lght">You've reached the final part of my portfolio. Please leave a review regarding it for future purposes. The count below shows the current ranking of how people view my portfolio. You may choose from Grr, to I love it, and to it was aight. The count below is taken from my firebase database for realtime changes and updates.</p>
        <div className='flx flx-jc-ce flx-ai-ce w-100 m-t-2'>
          <FacebookIcon onClick={() => openlink('https://www.facebook.com/rey.ondap.77/')} sx={{
            fontSize: 72, color: theme.palette.icons.main, '&:hover': {
              color: theme.palette.icons.light
            }
          }} />
          <InstagramIcon onClick={() => openlink('https://www.instagram.com/noticemypost/')} sx={{
            fontSize: 72, color: theme.palette.icons.main, '&:hover': {
              color: theme.palette.icons.light
            }
          }} />
          <LinkedInIcon onClick={() => openlink('https://www.linkedin.com/in/rey-louis-ondap-7282991ba/')} sx={{
            fontSize: 72, color: theme.palette.icons.main, '&:hover': {
              color: theme.palette.icons.light
            }
          }} />
          <ColorLensIcon onClick={() => openlink('https://www.behance.net/reyondap')} sx={{
            fontSize: 72, color: theme.palette.icons.main, '&:hover': {
              color: theme.palette.icons.light
            }
          }} />
        </div>
      </div>

      <div className='elem-b w-100 flx flx-ai-ce flx-jc-ce'>
        <div className='bg-orgdesc p-10'>
          <p className='pay txt-drk'>ANGRY: <span className=''>{currevs.angry}</span></p>
        </div>
        <div className='bg-orgdesc p-10 m-l-2 m-r-2'>
          <p className='pay txt-drk'>HAPPY: <span className=''>{currevs.happy}</span></p>
        </div>
        <div className='bg-orgdesc p-10'>
          <p className='pay txt-drk'>SAD: <span className=''>{currevs.sad}</span></p>
        </div>
      </div>
    </section>
  )
}

export default Desc