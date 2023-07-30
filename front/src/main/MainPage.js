import React from 'react';
import "../App.css";

import MainWrapper4 from "./MainWrapper4";
import MainSection1 from "./MainSection1";
import MainSection2 from "./MainSection2";
import MainSection3 from "./MainSection3";

function MainPage(props) {
    return (
        <div>
            <MainSection1/>
            <MainSection2/>
            <MainSection3/>
            {/*<MainWrapper4/>*/}
        </div>
    );

}

export default MainPage;