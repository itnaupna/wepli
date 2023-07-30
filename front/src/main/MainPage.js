import React from 'react';
import "../App.css";

import MainWrapper3 from "./MainWrapper3";
import MainWrapper4 from "./MainWrapper4";
import MainSection1 from "./MainSection1";
import MainSection2 from "./MainSection2";

function MainPage(props) {
    return (
        <div>
            <MainSection1/>
            <MainSection2/>
            <MainWrapper3/>
            <MainWrapper4/>
        </div>
    );

}

export default MainPage;