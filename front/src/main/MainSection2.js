import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "./css/MainSection2.css";
import handheart from "./photo/handheart.jpg";
import youtube from "./photo/youtube9.png";
import youtube1 from "./photo/youtube10.png";
import posther1 from "./photo/poster1.png";
import posther2 from "./photo/posther2.png";
import star from "./photo/star.png";
import texts from "./photo/3dtext.png";

function MainSection2(props) {
    const youtubeRef = useRef(null);
    const youtube1Ref = useRef(null);
    const postersRef = useRef([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Define the animations for YouTube images
        gsap.fromTo(youtubeRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: youtubeRef.current, start: "top 80%", end: "top 50%", scrub: 1 } });
        gsap.fromTo(youtube1Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: youtube1Ref.current, start: "top 80%", end: "top 50%", scrub: 1 } });

        // Define the animations for poster images
        postersRef.current.forEach((poster) => {
            gsap.fromTo(poster, { opacity: 0, y: 50, rotation: -45 }, { opacity: 1, y: 0, rotation: 0, duration: 1, scrollTrigger: { trigger: poster, start: "top 80%", end: "top 50%", scrub: 1 } });
        });
    }, []);

    return (
        <div className={'mainsection2'}>
            <div className={'mainsection2gra'}>
                <div className={'mainsection2photogroup'}>
                    <img src={youtube} className={'main2img'} ref={youtubeRef} />
                </div>
                <div className={'mainsection2photogroup1'}>
                    <img src={youtube1} className={'main2img2'} ref={youtube1Ref} />
                </div>
            </div>
            <div className={'posthergroup'}>
                <img src={posther1} className={'posther1'} ref={(el) => postersRef.current[0] = el} />
                <img src={posther2} className={'posther2'} ref={(el) => postersRef.current[1] = el} />
                <img src={star} className={'posther3'} ref={(el) => postersRef.current[2] = el} />
                <img src={texts} className={'posther4'} ref={(el) => postersRef.current[3] = el} />
                <img src={posther2} className={'posther5'} ref={(el) => postersRef.current[4] = el} />
            </div>
        </div>
    );
}

export default MainSection2;
