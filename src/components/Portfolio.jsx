import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { mouseScrollAnim } from '../scrollFunctions';
import srcs from '../assets/srcs.json';
import { ScrollTrigger } from 'gsap/all';

function displaySamples() {
    gsap.fromTo('.portf', {
        y: 1500,
        opacity: 0,
    }, {
        y: 0,
        opacity: 1,
        stagger: .25,
    })
}

const positioning = ['tl', 'tr', 'bl', 'br'];

function Portfolio(props) {

    gsap.registerPlugin(ScrollTrigger)

    const { showval, clkShow, sel, setSel } = props;
    const [firstLoad, setfirst] = useState(1);

    // Wait to get all the data about the clicked value.
    // In this case it would be the data from the json file whether it be the graphic design or the web design
    // Once clicked show thumbnails of the clicked value (gdes / wdes)

    useEffect(() => {
        if (showval.selectPortf.show) {
            displaySamples();
        }
        else {
            if (!firstLoad) {
                let resetTl = gsap.timeline();

                try {
                    resetTl.fromTo('#btnsCont .btn', {
                        opacity: 0,
                    }, {
                        opacity: 1,
                    }).fromTo('#portfFish img', {
                        x: 1500,
                        opacity: 0,
                    }, {
                        x: 0,
                        opacity: 1,
                        onComplete: () => {
                            document.querySelector('#portfFish img').classList.add('one');
                        }
                    })
                } catch (error) {
                    resetTl.pause().reverse();
                }
            }
        }
    }, [showval.selectPortf.show]);

    // This function hides the initial fish and button and loads up the graph of web portfolio
    async function initClick(e) {

        document.querySelector('#portfFish img').classList.remove('one');
        // Sets the navigation icon to back in Navigation.jsx
        setSel(1);

        let data = srcs[e.currentTarget.dataset.target];
        let addedClass = e.currentTarget.dataset.target === 'webs' ? 'web' : 'grph';
        let datatest = await data.map(element => {
            return {
                src: element.srcs[0],
                target: element.name,
            }
        });

        let tl = gsap.timeline();

        tl.to('#btnsCont .btn', {
            opacity: 0,
        }).to('#portfFish img', {
            x: -1500,
            opacity: 0,
        }).then(() => {
            try {
                clkShow({
                    ...showval,
                    srcData: {
                        obj: data,
                        srcVal: undefined
                    },
                    selectPortf: {
                        show: 1,
                        thumbs: datatest.map(element => element.src),
                        target: datatest.map(element => element.target),
                        type: addedClass,
                    },
                })

            } catch (error) {
                console.log(`An error has occurred: ${error}`);
            }
        })
    }

    async function click(targ) {

        let trg = targ.currentTarget;
        let retval = await showval.srcData.obj.filter(element => element.name === trg.dataset.title);
        clkShow({
            ...showval,
            srcData: {
                obj: showval.srcData.obj,
                srcVal: retval
            },
            display: 1,
            text: trg.dataset.title,
        })
    }

    useEffect(() => {
        const introTxt = document.getElementById('portfCont');
        const navbars = document.querySelectorAll('[data-id="portfCont"]');
        if (!introTxt.classList.contains('actv')) {
            mouseScrollAnim(introTxt, navbars);
        }

        let loadTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#portfCont',
                start: 'top 75%',
            }
        })

        loadTl.fromTo('#btnsCont .btn', {
            opacity: 0,
        }, {
            opacity: 1,
        }).fromTo('#portfFish img', {
            x: 1500,
            opacity: 0,
        }, {
            x: 0,
            opacity: 1,
            onComplete: () => {
                document.querySelector('#portfFish img').classList.add('one');
            }
        });
    }, [])

    useEffect(() => {
        if (showval.display) {
            gsap.fromTo('#showcase', {
                opacity: 0,
            }, {
                opacity: 1
            })
        }
    }, [showval])

    return (

        <section className="pos-rel w-vw h-vh bg-brwn flx ovr-hide" id='portfCont'>

            {
                showval.selectPortf.show ?
                    showval.selectPortf.thumbs.map((thumb, index) => {
                        return (
                            <img key={index} src={thumb} alt={`thumb${index}`} className={`w-50 pos-abs portf ${showval.selectPortf.type} ${positioning[index]}`} data-title={showval.selectPortf.target[index]} onClick={click} />
                        )
                    })
                    :
                    <div className='' id='portfFish'>
                        <img src='./fish/hap2.png' alt='hap2' className='w-80 m-l-auto m-r-auto m-t-auto m-b-auto' />
                        <div className='flx flx-ai-ce flx-jc-ce w-80 m-l-auto m-r-auto' id='btnsCont'>
                            <button className='btn btn-org pay w-30 m-1 m-r-auto' data-target="webs" onClick={initClick}>Web Design</button>
                            <button className='btn btn-org pay w-30 m-1 m-l-auto' data-target="graphdes" onClick={initClick}>Graphic Design</button>
                        </div>
                    </div>
            }
        </section >
    )

}
{/* Portfish contains the image of the fish for design and the buttons for choosing the portfolio at the beginning */ }
/*

*/
export default Portfolio