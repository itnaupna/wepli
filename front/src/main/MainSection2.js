import React from 'react';
import "./css/MainSection2.css";
import handheart from "./photo/handheart.jpg";
import youtube from "./photo/youtube9.png";
import youtube1 from "./photo/youtube10.png";

function MainSection2(props) {

    return (
        <div className={'mainsection2'}>
            <div className={'mainsection2gra'}>
                <div className={'mainsection2photogroup'}>
                    <img src={youtube} className={'main2img'}/>
                </div>
                <div className={'mainsection2photogroup1'}>
                    <img src={youtube1} className={'main2img2'}/>
                </div>
            </div>
            {/* New div for horizontal scrolling */}
            {/*<div className={'mainsection2flow'}>*/}
            {/*    <img src={handheart} className={'handheart'}/>*/}
            {/*    <img src={handheart} className={'handheart1'}/>*/}
            {/*    /!* Add more images here *!/*/}
            {/*</div>*/}
        </div>
    );
}

export default MainSection2;