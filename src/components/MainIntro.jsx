import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useEffect } from 'react';
import { mouseScrollAnim } from '../scrollFunctions';

function MainIntro() {

    useEffect(() => {
        const introTxt = document.getElementById('introTxt');
        const navbars = document.querySelectorAll('[data-id="introTxt"]');

        if(!introTxt.classList.contains('actv')){
            mouseScrollAnim(introTxt, navbars);
        }
    }, [])

    return (

        <section className="pos-rel w-vw h-vh bg-brwn flx ovr-xhide ovr-yshow p-50" id='introTxt'>
            <div className="flx flx-col w-50 p-20 m-t-auto m-b-auto" id="introMes">
                <h1 className="txt-drk pay headTxt">Who is <span className="txt-org">BALL OF FISH</span>?</h1>
                <h2 className="gud med m-t-2">I am Rey a <span className="txt-org gud bld">Graphic Designer</span> and a <span className="txt-org gud bld">Front End Developer</span> I have a couple of work experiences and I am here to help you with your aspirations.</h2>
                <small className="gud reg m-t-5">I can do a lot of stuffs and I am for sure the person you need. I even have experiences in marketing!! </small>
            </div>
            <div className="flx w-50 pos-rel" id="IntroImg">
                <img src="./fish/hap2.png" alt="hap2" className="one w-100" />
            </div>
        </section>
    )
}

export default MainIntro