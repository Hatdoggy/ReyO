import { useEffect } from 'react'
import data from '../assets/srcs.json'
import gsap from 'gsap'
import { mouseScrollAnim } from '../scrollFunctions';

const fishtext = "HERE ARE MY SKILLS";
const whtspc = undefined;

function moveplaces() {
    const updateAnimation = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        gsap.to(".crcs", {
            y: `random(${height * -0.5}, ${height * 0.5})`, // Adjust based on window height
            x: `random(${width * -0.5}, ${width * 0.5})`,   // Adjust based on window width
            duration: 5,
            repeatRefresh: true,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut",
        });
    };

    // Initial animation setup
    updateAnimation();

    // Update animation on window resize
    window.addEventListener("resize", updateAnimation);

    // Cleanup event listener when animation is no longer needed
    return () => {
        window.removeEventListener("resize", updateAnimation);
    };
}

function showTxt() {

    let fish = document.querySelector('.skillsFish');

    let tl = gsap.timeline();
    fish.classList.remove('one');

    tl.to('.excl', {
        opacity: 0,
        display: 'none',
    }).to('.skillsFish', {
        x: -5000,
        opacity: 0,
        duration: 3,
    }, '<').fromTo('#skillstxt', {
        opacity: 0,
        scale: 1.5,
    }, {
        opacity: 1,
        duration: .5,
        scale: 1,
    }, '<').to('#skillstxt',{
        opacity:0,
    }).fromTo('.crcs',{
        opacity:0,
    },{
        opacity:1
    }).then(moveplaces)

}

function Skills() {

    useEffect(() => {

        const introTxt = document.getElementById('skillsCont');
        const navbars = document.querySelectorAll('[data-id="skillsCont"]');
        if (!introTxt.classList.contains('actv')) {
            mouseScrollAnim(introTxt, navbars);
        }

        gsap.fromTo('.excl', {
            opacity: 0,
            scale: .2,
        }, {
            opacity: 1,
            scale: 1,
            onComplete: () => {
                let excl = document.querySelector('.excl');
                setTimeout(() => {
                    gsap.set(excl, {
                        clear: 1,
                    });
                    excl.classList.add('shaking');
                }, 500);
            }
        })
    }, [])


    return (
        <section className="pos-rel w-vw h-vh bg-drk flx flx-jc-ce flx-ai-ce flx-col ovr-hide" id='skillsCont'>
            <div className='w-100 h-100 flx flx-col flx-ai-ce' id='parent'>
                <div id='fishcont' className='m-l-auto m-r-auto flx m-t-auto m-b-auto'>
                    <div className='flx flx-col flx-ai-ce flx-jc-ce excl' onClick={showTxt}>
                        <img src='./excl.png' alt='excl' />
                        <small className='txt-org gud bld m-t-2'>Click Me</small>
                    </div>
                    <img src='./fish/hap1.png' alt='hap1' className='skillsFish one' />
                </div>
                {
                    data.skills.map((elem, ndx) => (
                        <div id={`circ${ndx}`} key={ndx} className={`crcs ${elem.size}`}>
                            <img src={elem.src} alt={elem.name} />
                        </div>
                    ))
                }
                <img src='./skills/txt.png' alt='txt' className='' id="skillstxt"/>

            </div>
        </section>
    )
}

export default Skills