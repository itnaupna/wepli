import React, {Component, useEffect, useState} from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Axios from "axios";
import dayjs from 'dayjs';
import ResultItem from "./ResultItem";
import axios from "axios";
import { Link } from "react-router-dom";
import '../PlayStageCss/StageSlide.css'


function StageSlider() {
    const [resItems, setResItems] = useState([]);

    
    useEffect(() => {
      axios.get("/api/lv0/s/stage", { params: { curr: 1, cpp: 6 } })
        .then(res => { setResItems(res.data); console.log(res.data); })
        .catch(res => console.log(res));
    }, []);
        const settings = {
            className: "middle",
            centerMode: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 1000,  
            centerPadding: "50px",
            variableWidth:true,
            speed: 400,
            slidesToScroll: 1,
        };
        const bucketURl = process.env.REACT_APP_BUCKET_URL;
        const [FollowStage, setFollowStage] = useState([]);
        const [noLogin , setNoLogin] = useState("팔로우한 스테이지가 없습니다.");

        useEffect(()=>{
            if(sessionStorage.getItem("data")!=null) {
                const FollowStageUrl = "/api/lv2/s/fstage";
                Axios.get(FollowStageUrl)
                    .then(res =>
                        setFollowStage(res.data));
            }else{
            }
            setNoLogin("로그인 후 이용해주세요");
        },[]);

        return (
            <div className="FollowStageSliderBody" style={{margin:'auto',top:'20px',bottom:0}}>
                <Slider {...settings}>
                
                {
            resItems.map((v, i) =>
              <Link to={"/stage/" + v.address}>
                <ResultItem data={v} key={i} />
              </Link>
            )
                    
            }
                
                </Slider>
            </div>
                
        );

}
export default StageSlider;