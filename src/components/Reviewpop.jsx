import gsap from 'gsap';
import { useEffect } from 'react';

function Reviewpop(props) {

    const revImg = {
        "angry": './fish/ang1.png',
        "happy": './fish/hap1.png',
        "sad": './fish/sad1.png'
    }
    const { reviewed, setReview } = props;

    useEffect(() => {

        gsap.fromTo('.bg-orgpop', {
            opacity: 0,
            y: -150,
        }, {
            opacity: 1,
            y: 0
        })

        setTimeout(() => {
            gsap.fromTo('.bg-orgpop', {
                opacity: 1,
                y: 0
            }, {
                opacity: 0,
                y: 150,
            }).then(() => {
                setReview({
                    ...reviewed,
                    rev: 0
                })
            })
        }, 4000);
    }, [])

    return (
        <section className='w-100 flx h-100 bg-pop pos-abs z-top' id="reviewVal">
            <div className="flx flx-col w-50 p-20 m-l-auto m-r-auto m-t-auto m-b-auto bg-orgpop">
                <img src={revImg[reviewed.choice]} alt={reviewed.choice} className='w-30 m-l-auto m-r-auto' />
                <h4 className="txt-drk pay txt-al-ce m-t-2">Thank you for your review</h4>
                <h4 className="gud reg txt-al-ce"> You have given my portfolio a review of <span className="txt-wht pay">{reviewed.choice}</span> I shall keep this review in my heart.</h4>
            </div>
        </section>
    )
}

export default Reviewpop