import React, { useEffect } from 'react';
import wepli1min from "./photo/wepli2-min.jpg";
import "./css/MainSection3.css";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function MainSection3(props) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(".mstext p", {
            backgroundPositionX: '0%',
            stagger: 1,
            scrollTrigger: {
                trigger: ".mstext",
                scrub: 1,
                start: "top center",
                end: "bottom top",
            },
        });
    }, []);

    return (
        <div className="mainsection3">
            <div className={"wepli1mingroup"}>
                <img src={wepli1min} className={'wepli1min'}/>
            </div>
            <div className="mscontainer">
                <div className="mstext">
                    <p className="text1">위플리</p>
                    <p className="text2">노래가 좋아</p>
                    <p className="text3">유튜브가 좋아</p>
                </div>
            </div>
        </div>
    );
}

export default MainSection3;
