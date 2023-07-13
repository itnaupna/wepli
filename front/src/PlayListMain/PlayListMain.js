import React, { useEffect, useRef } from 'react';
import "./PlayListMain.css";

const PlayListMain = () => {
    const containerRef = useRef(null);
    const boxRefs = useRef([]);

    useEffect(() => {
        let dWidth = 0; // 브라우저 가로
        let dHeight = 0; // 문서 전체의 높이

        const tmp = () => {
            const container = containerRef.current;
            const boxes = boxRefs.current;

            // container의 가로사이즈(화면가로 * box 개수)
            const conWidth = window.innerWidth * boxes.length;

            container.style.width = `${conWidth}px`;
            container.style.height = '100vh';
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';

            boxes.forEach((box) => {
                box.style.width = `${conWidth / boxes.length}px`;
                box.style.height = '100vh';
                box.style.float = 'left';
            });

            document.body.style.height = '100vh';

            const wWidth = window.innerWidth;
            const wHeight = window.innerHeight;

            dWidth = conWidth - wWidth;
            dHeight = document.body.offsetHeight - wHeight;
        };

        tmp();

        const boxOffsets = boxRefs.current.map((box) => box.offsetLeft);

        let chk = true;
        const handleScroll = (event) => {
            if (chk) {
                chk = false;
                setTimeout(() => {
                    chk = true;
                }, 500);

                const wDelta = event.deltaY || event.detail || (-event.wheelDelta);

                if (wDelta < 0 && event.currentTarget.nextElementSibling) {
                    const nextIndex = boxRefs.current.indexOf(event.currentTarget) + 1;
                    const nextOffset = boxOffsets[nextIndex];
                    containerRef.current.style.transform = `translateX(-${nextOffset}px)`;
                } else if (wDelta > 0 && event.currentTarget.previousElementSibling) {
                    const prevIndex = boxRefs.current.indexOf(event.currentTarget) - 1;
                    const prevOffset = boxOffsets[prevIndex];
                    containerRef.current.style.transform = `translateX(-${prevOffset}px)`;
                }
            }
        };

        boxRefs.current.forEach((box) => {
            box.addEventListener('wheel', handleScroll, { passive: false });
            box.addEventListener('DOMMouseScroll', handleScroll, { passive: false });
        });

        return () => {
            boxRefs.current.forEach((box) => {
                box.removeEventListener('wheel', handleScroll);
                box.removeEventListener('DOMMouseScroll', handleScroll);
            });
        };
    }, []);

    return (
        <div className="container" ref={containerRef}>
            <div className="image-3 box" ref={(el) => (boxRefs.current[0] = el)}>여기 확인</div>

            <div className="box" ref={(el) => (boxRefs.current[1] = el)}>Box 2</div>
            <div className="box" ref={(el) => (boxRefs.current[2] = el)}>Box 3</div>
            {/* Add more boxes as needed */}
        </div>
    );
};

export default PlayListMain;