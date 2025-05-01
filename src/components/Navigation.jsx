import { HandMetal, UserRound, Star, GalleryHorizontal, MoveLeft, MessageSquareText } from 'lucide-react';
import navScroll from '../scrollFunctions';
import gsap from 'gsap';
import { useEffect } from 'react';

function VertNav(props) {

    const { sel, setSel, show, setShow } = props;

    // Handles navigation click
    /*
        This click function adds the animation of the navigation button and the 
        scroll of the window to specific parts of the website
    */

    function click(e) {
        if (!e.currentTarget.classList.contains('actv')) {
            navScroll(e.currentTarget)
        }
    }

    function reset() {
        // This function resets the navigation bar to the default state
        // It also brings back the selection page of portfolio.jsx
        
        let resetTL = gsap.timeline();

        resetTL.fromTo('.portf', {
            y: 0,
            opacity: 1,
        }, {
            y: 1500,
            opacity: 0,
            stagger: .25,
            onComplete: () => {
                setShow({
                    text: undefined,
                    display: 0,
                    srcData: undefined,
                    selectPortf: {
                        show: 0,
                        thumbs: undefined,
                        target: undefined,
                    },
                })
                setSel(0);
            }
        })

    }

    return (

        <section className="pos-fix w-vw h-vh flx" id='vertNav'>
            <div onClick={click} className="vnav flx flx-ai-ce flx-jc-ce p-10 actv" id='intrNav' data-id='intro'>
                <HandMetal strokeWidth={2} />
            </div>
            <div onClick={click} className="vnav flx flx-ai-ce flx-jc-ce p-10" id='intrTxtNav' data-id='introTxt'>
                <UserRound strokeWidth={2} />
            </div>
            <div onClick={click} className="vnav flx flx-ai-ce flx-jc-ce p-10" id='sklsNav' data-id='skillsCont'>
                <Star strokeWidth={2} />
            </div>
            <div onClick={sel ? reset : click} className="vnav flx flx-ai-ce flx-jc-ce p-10" id='portfNav' data-id='portfCont'>
                {
                    sel ?
                        <MoveLeft strokeWidth={2} style={{ transform: 'rotate(90deg)' }} />
                        :
                        <GalleryHorizontal strokeWidth={2} />
                }
            </div>
            <div onClick={click} className="vnav flx flx-ai-ce flx-jc-ce p-10" id='sklsNav' data-id='reviewcont'>
                <MessageSquareText strokeWidth={2} />
            </div>
        </section>
    )
}

export default VertNav