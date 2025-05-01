import gsap from 'gsap';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

function Showcase(prop) {

    const { show, setShow } = prop;

    //Set cursrc to the first image in the array of images
    // The first image is the one that is displayed in the pop up

    function updateFocus(e) {
        let focus = document.querySelector('#focusImg img');
        let img = e.target.src;
        let transition = gsap.timeline();

        transition.to(focus, {
            opacity: 0,
            onComplete: () => {
                focus.src = img;
            }
        }).to(focus, {
            opacity: 1,
        })
    }

    // Showcase is the pop up that shows the element clicked on in the portfolio section
    /*
        Contains the title of the element and the image of the element clicked on
        The image is the one that is clicked on in the portfolio section. The title is the name of the element clicked on.

        Flow
        1. Click on element in portfolio section
        2. The title and description of the element clicked on is displayed in the pop up
        3. The image of the element clicked on is displayed in the pop up including the other images available for that element
    */

    useEffect(() => {

        let transition = gsap.timeline();

        setTimeout(() => {
            transition.to('#pageTitle img', {
                x: 5000,
            }).to('#pageTitle', {
                opacity: 0,
                display: "none",
                onComplete: () => {
                    if (document.getElementById('pageTitle')) {
                        document.getElementById('pageTitle').style.display = "none";
                        document.getElementById('showCont').style.display = "flex";
                    }
                }
            }).to('#showCont', {
                opacity: 1,
            })
        }, 2500);

    }, []);

    function close() {
        gsap.to('#showcase', {
            opacity: 0,
            onComplete: () => {
                setShow({
                    ...show,
                    text: undefined,
                    display: 0,
                })
            }
        })
    }

    return (

        <section className="pos-fix z-top w-vw h-vh bg-pop flx flx-col flx-ai-ce" id='showcase'>

            <div className="elem-tr" onClick={close}>
                <LogOut className='exit' size={64} />
            </div>

            <div className="flx flx-col w-50 p-20 m-t-auto m-b-auto txt-wht flx-ai-ce m-l-auto m-r-auto pos-rel" id="pageTitle">
                <h4 className="txt-org pay headTxt txt-al-ce">{show.text}</h4>
                <p className="gud reg m-t-2 txt-al-ce">{show.srcData.srcVal[0].desc}</p>
                <img src="./fish/hap3.png" alt="hap3" className="fish fish1 one" />
            </div>

            <div className='w-100 flx flx-col flx-ai-ce h-100 p-20 ovr-scr-y' id='showCont' style={{ display: "none", opacity: 0 }}>

                <div className={`m-l-auto m-r-auto flx ${show.srcData.srcVal[0].name.toLowerCase()}`} id='focusImg'>
                    {/* This could use a class in order to set the sizing of the focus image depending on the target type of portfolio */}
                    <img src={show.srcData.srcVal[0].srcs[0]} alt='focusImage' className='m-l-auto m-r-auto' />
                </div>

                <div className="flx w-50 pos-rel m-l-auto m-r-auto" id="IntroImg">
                    {
                        show.srcData.srcVal[0].srcs.map((img, index) => (
                            <div key={index} className={`img-box ${show.srcData.srcVal[0].name.toLowerCase()}`}>
                                <img key={index} src={img} alt={`${show.srcData.srcVal[0].name}${index + 1}`} onClick={updateFocus} />
                            </div>
                        ))
                    }
                </div>

                {/* Description for websites and their links */}
                {
                    show.selectPortf.type === "web" &&
                    <div id='webDesc' className='flx flx-col w-50 m-t-2'>
                        <p className="gud reg txt-wht">{show.srcData.srcVal[0].desc}</p>
                        <button className='btn btn-org2 m-t-2 pay w-50' onClick={() => window.open(show.srcData.srcVal[0].link, '_blank')}>VISIT PAGE</button>
                    </div>
                }

                <div className='elem-desc bg-orgdesc p-10'>
                    <p className='pay txt-wht'>{show.text}</p>
                </div>

            </div>
        </section>
    )
}

export default Showcase