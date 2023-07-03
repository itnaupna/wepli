import React, {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import box from "../MainSvg/box.svg";
import headphone from "../MainSvg/headphone.svg";
import together from "../MainSvg/together.svg";
import mainP from "../MainImage/pinkmain.jpg";
import "../MainCss/MainSection.scss";
import "../MainCss/MainSection.css";
function MainSection(props) {

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    const textRef = useRef(null);

    useEffect(() => {
        // Create GSAP animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.desktop1440px',
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

        // let sections = gsap.utils.toArray(".panel");
        //
        // function goToSection(i) {
        //     gsap.to(window, {
        //         // eslint-disable-next-line no-restricted-globals
        //         scrollTo: { y: i * innerHeight, autoKill: false, ease: "Power3" },
        //         duration: 2
        //     });
        // }
        //
        // ScrollTrigger.defaults({
        //     // markers: true
        // });
        //
        // sections.forEach((eachPanel, i) => {
        //     // const mainAnim = gsap.timeline({ paused: true });
        //
        //     ScrollTrigger.create({
        //         trigger: eachPanel,
        //         onEnter: () => goToSection(i)
        //     });
        //
        //     ScrollTrigger.create({
        //         trigger: eachPanel,
        //         start: "bottom bottom",
        //         onEnterBack: () => goToSection(i)
        //     });
        // });

    }, []);
    return (
        <div>
            <div>
                {/*<Menubar/>*/}
                <div>
                    <div className="image-container">
                        <img src={mainP} alt="" className="overlay-image"/>
                        <img src={mainP} alt="" style={{width: '100vw', height: '100vh'}}
                             className={'front-image'}/>

                        <div className={'front-text'}>
                            <div>we pli;</div>
                            <div>we share, we play</div>
                        </div>
                    </div>
                    <div className="group-parent">
                        <div className="desktop1440px-wrapper">
                            <div className="desktop1440px">
                                <div className="div" ref={textRef}>공유하다.</div>
                                <div className="group-container">
                                    <div className="group-div">
                                        <div className="rectangle-wrapper">
                                            <div className="group-child" />
                                        </div>
                                        <img
                                            className="together-1-icon"
                                            alt=""
                                            src={together}
                                        />
                                        <div className="div1">글로벌</div>
                                        <div className="div2">다양한 음악을 사람들에게 알려주세요!</div>
                                    </div>
                                    <div className="rectangle-parent">
                                        <div className="group-item" />
                                        <div className="div3">플레이리스트</div>
                                        <div className="div4">
                                            <p className="p">나의 인생 곡</p>
                                            <p className="p">플레이리스트로 만들어</p>
                                            <p className="p">공유할수있습니다.</p>
                                        </div>
                                        <div className="div4">
                                            <p className="p">나의 인생 곡</p>
                                            <p className="p">플레이리스트로 만들어</p>
                                            <p className="p">공유할수있습니다.</p>
                                        </div>
                                        <img
                                            className="headphone-1-icon"
                                            alt=""
                                            src={headphone}
                                        />
                                    </div>
                                    <div className="rectangle-group">
                                        <div className="group-inner" />
                                        <div className="div6">소개</div>
                                        <div className="div7">
                                            <p className="p">내가 몰랐던</p>
                                            <p className="p">다른 유저의 인생 곡</p>
                                            <p className="p">공유하여 즐기세요.</p>
                                        </div>
                                        <img className="gr-2-icon" alt="" src={box} />
                                    </div>
                                </div>
                                <div className="rectangle-container">
                                    <div className="rectangle-div" />
                                    <div className="div8">더 알아보기</div>
                                </div>
                            </div>
                        </div>
                        <div className="frame-wrapper">
                            <div className="group-wrapper">
                                <div className="group-parent1">
                                    <div className="group-parent2">
                                        <div className="wrapper">
                                            <div className="div9">
                                                <p className="p">나만의 스테이지를 만드세요.</p>
                                                <p className="p">
                                                    유튜브 음악을 다른 사용자들과 함께 들을 수 있습니다.
                                                </p>
                                                <p className="p">
                                                    실시간으로 채팅을 하며 다양한 음악 이야기를
                                                </p>
                                                <p className="p">나눌 수 있습니다.</p>
                                            </div>
                                        </div>
                                        <div className="parent">
                                            <div className="div10">{`소통하다. `}</div>
                                            <div className="rectangle-parent1">
                                                <div className="rectangle-div" />
                                                <div className="div8">더 알아보기</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="group-parent3">
                                        <div className="group">
                                            <div className="div12">
                                                <p className="p">생성</p>
                                            </div>
                                            <div className="div13">
                                                <p className="p">버튼 클릭 단 한번으로,</p>
                                                <p className="p">스테이지를 생성할 수 있습니다</p>
                                            </div>
                                        </div>
                                        <div className="rectangle-frame">
                                            <div className="group-child2" />
                                        </div>
                                    </div>
                                    <div className="group-parent4">
                                        <div className="container">
                                            <div className="div12">
                                                <p className="p">설정</p>
                                            </div>
                                            <div className="div13">
                                                <p className="p">다양한 옵션으로 설정하여,</p>
                                                <p className="p">나만의 스테이지를 만드세요!</p>
                                            </div>
                                        </div>
                                        <div className="rectangle-wrapper1">
                                            <div className="group-child3" />
                                        </div>
                                    </div>
                                    <div className="group-parent5">
                                        <div className="parent1">
                                            <div className="div16">
                                                <p className="p">감상</p>
                                            </div>
                                            <div className="div13">
                                                <p className="p">재생목록에 음악을 추가해,</p>
                                                <p className="p">사람들과 같이 음악을 즐길 수 있습니다.</p>
                                                <p className="p">&nbsp;</p>
                                                <p className="p">&nbsp;</p>
                                                <p className="p">&nbsp;</p>
                                            </div>
                                        </div>
                                        <div className="rectangle-frame">
                                            <div className="group-inner" />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainSection;