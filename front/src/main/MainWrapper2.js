import React, {useEffect, useRef} from 'react';
import "./css/MainWrapper2.css";
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import albumcover from "./svg/albumcover.svg";
function MainWrapper2(props) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    const textRef = useRef(null);

    useEffect(() => {
        // Create GSAP animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.mainsection2toptext',
                start: 'top 60%',
                end: 'top 80%',
                scrub: 1
            },
        });

        tl.fromTo(
            textRef.current,
            {opacity: 0, x: -200},
            {opacity: 1, x: 0, duration: 1, ease: 'power3'}
        );
    }, []);
    return (
        <div className="mainwrapper2">
            <div className="mainsection">
                <div className="leftsection">
                    <div className="mainsection2-1group">
                        <div className="albummainsection">
                            <div className="albumcenter">
                                <div className="albumcenter">
                                    <div className="bg" />
                                </div>
                                <div className="albumtitletext" >
                                    <div className="logotext">
                                        <div className="wepli" >wepli;</div>
                                    </div>
                                    <div className="secondtext">
                                        <div className="playlist" >PLAYLIST</div>
                                    </div>
                                </div>
                            </div>
                            <div className="albumimg">
                                <img className="album2-3-icon" alt="" src={albumcover} />
                            </div>
                        </div>
                        <div className="mainsectionhashtag">
                            <div className="div">
                                <p className="p">#</p>
                                <p className="p">팝</p>
                                <p className="p">송</p>
                            </div>
                        </div>
                        <div className="mainround">
                            <div className="mainround-child" />
                        </div>
                    </div>
                    <div className="mainsection2toptext">
                        <div className="topsubtitle">
                            <div className="make" ref={textRef}>MAKE</div>
                        </div>
                        <div className="toptitle">
                            <div className="div1" ref={textRef}>플레이리스트를 생성하세요.</div>
                        </div>
                    </div>
                </div>
                <div className="rightsection">
                    <div className="mainsection2bottomtext">
                        <div className="bottomtitle">
                            <div className="make">SHARE</div>
                        </div>
                        <div className="bottomsubtitle">
                            <div className="make">사람들과 공유하여 즐기세요.</div>
                        </div>
                    </div>
                    <div className="mainsection2-2group">
                        <div className="mainround">
                            <div className="mainround-child" />
                        </div>
                        <div className="mainsectionhashtag2">
                            <div className="div">
                                <p className="p">#</p>
                                <p className="p">재</p>
                                <p className="p">즈</p>
                            </div>
                        </div>
                        <div className="mainsection2">
                            <div className="albumcenter">
                                <div className="albumcenter">
                                    <div className="bg1" />
                                </div>
                                <div className="albumtitletext">
                                    <div className="logotext">
                                        <div className="wepli">wepli;</div>
                                    </div>
                                    <div className="secondtext">
                                        <div className="playlist">PLAYLIST</div>
                                    </div>
                                </div>
                                <div className="albumimg">
                                    <img
                                        className="album2-3-icon"
                                        alt=""
                                        src={albumcover}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainWrapper2;