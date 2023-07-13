import React from 'react';
import "../App.css";
import MainWrapper1 from "./MainWrapper1";
import MainWrapper2 from "./MainWrapper2";
import MainWrapper3 from "./MainWrapper3";
import MainWrapper4 from "./MainWrapper4";

function MainPage(props) {
    return (
        <div className={"MainWrappers"}>
            <MainWrapper1/>
            <MainWrapper2/>
            <MainWrapper3/>
            <MainWrapper4/>
        </div>
    );

}

export default MainPage;