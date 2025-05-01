import gsap from 'gsap';
import { ScrollToPlugin,ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

// Scroll on click of navigation
function navScroll(target){
    let actv = document.querySelector('.actv');
    let adjustTL = gsap.timeline();
    let goal = target.dataset.id;
    
    adjustTL.to('.actv',{
        backgroundColor: '#222222',
        color:'#fff',
        onComplete: () => {
            actv.classList.remove('actv');
            target.classList.add('actv');
        }
    }).to(target, {
        backgroundColor: '#FB6918',
        color:'#222222',
    },'<').to(window,{
        scrollTo:{
           y: `#${goal}`,
           autoKill: true,
        },
        duration:1,
        ease: "power2.inOut",        
    },'<')
}

// Mouse scroll animations

function enterActv(navbar) {
    gsap.to(navbar, {
        backgroundColor: '#FB6918',
        color:'#222222',
        duration: 0.3, // Animation duration
        onComplete: () => {
            navbar.classList.add('actv'); // Add the 'actv' class
        }
    })
}

function removeSibActv(sibling) {
    gsap.to(sibling, {
        backgroundColor: '#222222',
        color:'#fff',
        duration: 0.3, // Animation duration
        onComplete: () => {
            sibling.classList.remove('actv'); // Add the 'actv' class
        }
    });
}

function removeLeave(navbar) {
    gsap.to(navbar, {
        backgroundColor: '#222222',
        color:'#fff',
        duration: 0.3, // Animation duration
        onComplete: () => {
            navbar.classList.remove('actv'); // Remove the 'actv' class
        }
    })
}

function mouseScrollAnim(trigger,navbars) {
    ScrollTrigger.create({
        trigger: trigger,
        start: 'top 30%', // When the top of introTxt reaches 30% of the viewport
        end: 'bottom center', // When the top of introTxt reaches 30% of the viewport
        onEnter: () => {
            navbars.forEach(navbar => enterActv(navbar));
            // Remove 'actv' class from siblings
            const siblings = document.querySelectorAll(`.vnav.actv:not([data-id="${navbars[0].dataset.id}"])`);
            siblings.forEach(sibling => removeSibActv(sibling));
        },
        onEnterBack: () => {
            navbars.forEach(navbar => enterActv(navbar));
            // Remove 'actv' class from siblings
            const siblings = document.querySelectorAll(`.vnav.actv:not([data-id="${navbars[0].dataset.id}"])`);
            siblings.forEach(sibling => removeSibActv(sibling));
        },
        onLeave: () => {
            navbars.forEach(navbar => removeLeave(navbar));
            // Remove 'actv' class from siblings
        },
        onLeaveBack: () => {
            navbars.forEach(navbar => removeLeave(navbar));
            // Remove 'actv' class from siblings
        }
    });
}

export { navScroll, enterActv, removeSibActv, removeLeave, mouseScrollAnim };
export default navScroll;