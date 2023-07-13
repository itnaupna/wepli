import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useInView } from 'react-intersection-observer';
import '../PlayStageCss/PlayStageList.css';
import Slide from '../PlayStageJS/Slide.js';
import ArrowDown from '../PlayStageImage/Icon/ArrowDown.svg';
import Search from '../PlayStageImage/Icon/SearchIcon.svg';

function PlayStageList(props) {

    const [isLoading,setIsLoading] = useState(false);
    //무한 스크롤
    const [stages,setStages] = useState([]);
    const [hasNextPage,setHasNextPage]=useState(true);
    const page = useRef(1);
    const [ref, inView] =useInView(true);

    const fetch = useCallback(async()=>{
        try{
            //데이터 패칭을 시작하면 로딩 상태를 로딩 중으로 변환
            setIsLoading(true)
            const {data} = await axios.get(
                `https://gist.githubusercontent.com/jameskim0208/b97dbc72150c193c7e9b941b235f4bc0/raw/64cc7dc61922538c456b711fd94a71fb7bfc9a3a/gistfile1.json?_limit=3&_page=${page.current}`
            );
            //로딩 중을 표시할 div가 보일 시간을 주기 위한 setTime
            setTimeout(()=>{
                setStages((prevStages)=>[...prevStages, ...data]);

            },1500)
            //패칭이 실행되면 다음에 실행될 페이지를 1page 늘려준다.
            setHasNextPage(data.length===3);
            if(data.length){
                page.current +=1;
            }
        }catch(err){
            console.log(err);
        }
        //로딩중을 표시할 div가 보일 시간을 주기 위한 setTimeout
        setTimeout(()=>{
            setIsLoading(false)
        },1500)
    },[]);
    //inView(useState)를 통해 useEffect 실행
    useEffect(()=>{
        console.log(inView, hasNextPage);
        if(inView && hasNextPage){
            fetch();
        }
    },[fetch, hasNextPage, inView]);
    
    console.log(stages);




  return (
    <div className='Lbackground'>
      <div className='Side-Bar'></div>
      <div className='Lmain-Tsection'>
        <div className='Tsection-Lside'>
          <div className='TL-MyStage'>MyStage</div>
          { 
            1===2
            ?
            <a className="LiveOn-Icon" href="/"  data-text="Live On">Live On</a>

            :
            <button className="newStage-Button">
              <svg xmlns="http://www.w3.org/2000/svg" className='newStage-Icon'viewBox="0 0 24 24" fill="none">
                <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#4147d5"/>
              </svg>
            </button>
          }
          
        </div>
        <div className='Tsection-Rside'>
          <div className='Tsection-SearchBar'>
              <select className='Tsection-SelectBar'>
                <option>방장</option>
                <option defaultValue>제목</option>
                <option>태그</option>
                <option>장르</option>
              </select>
            <div className='Tsection-InputBar'>
              <img src={Search} alt='' className="Tsection-SearchBarIcon"/>
              <div className="Tsection-InputArea">
              <input type='text' className="InputPlace">
              </input>
              </div>
            </div>
          </div>
          <div className='Tsection-FollowStage'>
            <div className='TL-MyStage'>FollowStage</div>
            <Slide/>
          </div>
        </div>
      </div>
      <div className='Lmain-Bsection'>
        <div className='Bsection-select'>
          <select className='BselectBar'>
            <option>최신순</option>
            <option>인기순</option>
          </select>
          <div className='Bselect-Icon'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 11" fill="none">
              <path d="M1.50972 2.35292C2.44299 4.70758 4.44138 9.36599 5.6433 9.36291C6.84522 9.35984 8.8249 4.69125 9.74872 2.33184C10.0015 1.68631 9.52123 1.00203 8.82811 1.00381L2.42499 1.02019C1.73187 1.02197 1.25438 1.70869 1.50972 2.35292Z" fill="#D7E0FF" stroke="#4147D5" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        <div>
            <div className='Bsection-LiveList'>
                {stages?.map((item)=>(
                    <div key={item.address} className='room-item'>
                        <div>{item.address}</div>
                        <div>{item.title}</div>
                        <div>{item.nick}</div>
                       
                    </div>
                ))}
                {/* //눈에 안보이는 ref div - position으로 밑에 위치 시켜준다. */}
                <div ref={ref} style={{position:'absolute'}}/>
                {/* //로딩일 때 보여줄거에요 */}
                <div className='loading-Container'>
                    {isLoading===true?<div className='loading'></div>:null}
                </div>
            </div>

        </div>

      </div>
    </div>
  )
}

export default PlayStageList;