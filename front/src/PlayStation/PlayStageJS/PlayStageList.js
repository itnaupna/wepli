import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useInView } from 'react-intersection-observer';
import Loading from "./Loading";
import '../PlayStageCss/PlayStageList.css';
import Slide from '../PlayStageJS/Slide.js';


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
        </div>
        <div className='Tsection-Rside'>
          <div className='Tsection-SearchBar'>
            <div className='Tsection-InputBar'>
              <input type='text' className='Tsection-InputArea'></input>
              <span className='Tsection-InputArea-Icon'>
                <svg xmlns="http://www.w3.org/2000/svg" className='Tsection-InputArea-Icon' viewBox="0 0 17 14" fill="none">
                  <path d="M1.58535 2.39752C2.96443 5.53235 6.45873 12.9835 8.51391 12.9789C10.5691 12.9742 14.0296 5.50729 15.3945 2.36624C15.6776 1.71461 15.195 1.00156 14.4845 1.00317L2.48909 1.03034C1.7786 1.03195 1.29925 1.74718 1.58535 2.39752Z" fill="#D7E0FF" stroke="#4147D5" strokeWidth="1.5" />
                </svg>
              </span>
            </div>
            <svg className='Tsection-SearchBarIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 41" fill="none">
              <path d="M8 40C11.3137 40 14 37.0899 14 33.5C14 29.9101 11.3137 27 8 27C4.68629 27 2 29.9101 2 33.5C2 37.0899 4.68629 40 8 40Z" fill="#D7E0FF" stroke="#4147D5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M30.5 37C33.5376 37 36 34.0899 36 30.5C36 26.9101 33.5376 24 30.5 24C27.4624 24 25 26.9101 25 30.5C25 34.0899 27.4624 37 30.5 37Z" fill="#D7E0FF" stroke="#4147D5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M36 30.8338V14M14 19.8753L14 34" stroke="#4147D5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 20V10.2009C14 9.32876 14.5649 8.55666 15.3971 8.29575C17.7414 7.56073 20.1424 6.83016 22.598 6.15815C26.0838 5.20419 29.5142 4.41352 32.8269 3.64998C33.2474 3.55305 33.6836 3.41729 34.1245 3.29489C35.1528 3.00944 36 3.84268 36 4.90989V13.9546C35.6333 14.0708 35.2651 14.1877 34.8953 14.3051C31.6354 15.3403 28.2596 16.4122 24.7738 17.3662C21.288 18.3202 17.8576 19.1108 14.5449 19.8744C14.3629 19.9163 14.1813 19.9582 14 20Z" fill="#D7E0FF" stroke="#4147D5" strokeWidth="1.5" />
            </svg>
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