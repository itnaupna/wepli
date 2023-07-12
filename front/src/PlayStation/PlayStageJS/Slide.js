import React from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../PlayStageCss/PlayStageList.css';
import styled from "styled-components";
function Slide(props) {
    const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
        };
    const Wrap = styled.div
    `
    margin: 25% auto;
    width:100%;
    padding:60% auto;
    height:100vh;
    .slick-prev:before{
        opaicty:1;
        color:black;
    }    
    .slick-next:before{
        opacity:1;
        color:black;

    }
    .slick-dots{
        position:absolute;
        margin:0;
        bottom:-9.5rem;
    }



    
    
    `
        return (
            <Wrap className='Slider-setting'>
              <Slider {...settings}>
                <div>
                  <h3>1</h3>
                </div>
                <div>
                  <h3>2</h3>
                </div>
                <div>
                  <h3>3</h3>
                </div>
                <div>
                  <h3>4</h3>
                </div>
                <div>
                  <h3>5</h3>
                </div>
                <div>
                  <h3>6</h3>
                </div>
              </Slider>
            </Wrap>
          );
        }


export default Slide;