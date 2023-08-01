import React, { useCallback, useEffect, useRef, useState } from 'react';
import './CSM.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import Upload from '../PlayStageImage/Icon/upload.svg';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function makeAddress(length) {

    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
const CSM = ({ types, onClose}) => {
    const bucketURl = process.env.REACT_APP_BUCKET_URL;
    const initialAddress = makeAddress(5);//address길이를 5로 설정
    const [StageTitle, setStageTitle] = useState("");
    const [StageAddress, setStageAddress] = useState(initialAddress);
    const [StagePw, setStagePw] = useState(null);
    const [StageTags, setStageTags] = useState("");
    const [StageGenres, setStageGenres] = useState("");
    const [StageDesc, setStageDesc] = useState("");
    const StageImgRef = useRef();
    const [StageImg, setStageImg] = useState(bucketURl + "/stage/4a878683-bb43-4391-a228-b5eabaeb51c3");
    const [uploadStageImgName, setUploadStageImgName] = useState("/stage/4a878683-bb43-4391-a228-b5eabaeb51c3");
    const navigate = useNavigate();
    const [fetchedStageData,setFechedStageData] = useState(null);
    const [initialDataLoaded,setInitialDataLoaded] = useState(false);
    

    const [isEditMode,setIsEditMode] = useState(types === false);
    const stageUrl = useParams().stageUrl;
    useEffect(()=>{
        if(types ===false && !initialDataLoaded){
 
                Axios({
                    method:"get",
                    url:"/api/lv0/s/stageinfo",
                    params:{address:stageUrl},
                })
                .then((response)=>{
                    const StageData = response.data;
                    setFechedStageData(StageData);
                    setInitialDataLoaded(true);
                    setStageTitle(StageData.title);
                    setStagePw(StageData.maxlength);
                    setStageTags(StageData.tag);
                    setStageGenres(StageData.genre);
                    setStageDesc(StageData.desc);
                    setStageImg(bucketURl + StageData.img);
                    setUploadStageImgName(StageData.img);
                    console.log(response.data);
                })
                .catch((error)=>{
                    console.error("스테이지 정보 가져오는데 에러발생",error);
                });
            
        }
    },[types,initialDataLoaded,StageAddress,isEditMode,fetchedStageData]);



    useEffect(()=>{
        setIsEditMode(types === false);
    },[types])
    
    const handleCreateOrUpdate = () =>{
        if(isEditMode){
            updateStage();
        }else{
            CreateStage();
        }
    }
    
  const updateStageData = {
    title: StageTitle,
    maxlength: StagePw,
    address:stageUrl,
    tag: StageTags,
    genre: StageGenres,
    desc: StageDesc,
    nick: JSON.parse(sessionStorage.getItem('data') || localStorage.getItem('data')).nick,
    img: uploadStageImgName,
  };

  const updateStage = () => {
    Axios.patch('/api/lv2/s/stage', updateStageData)
      .then((res) => {
        if (res.data) {
          if (localStorage.getItem('data')) {
            let d = JSON.parse(localStorage.getItem('data'));
            d.stagetitle = StageTitle;
            localStorage.setItem('data', JSON.stringify(d));
          } else if (sessionStorage.getItem('data')) {
            let d = JSON.parse(sessionStorage.getItem('data'));
            d.stagetitle = StageTitle;
            sessionStorage.setItem('data', JSON.stringify(d));
          }
          navigate(0);
        } else {
          alert('스테이지 수정 실패');
        }
      })
      .catch((error) => {
        alert('스테이지 수정 에러: ' + error);
      });
  };
    

    const StageTitleOnChange = useCallback(e => {
        setStageTitle(e.target.value);
    });
    const StageDescOnChange = useCallback(e => {
        setStageDesc(e.target.value);
    });
    const StagePwOnChange = useCallback(e => {
        setStagePw(e.target.value);
    });
    const StageTagsOnChange = useCallback(e => {
        setStageTags(e.target.value);
    });
    const StageGenresOnChange = useCallback(e => {
        setStageGenres(e.target.value);
    });
    const onClickImageUpload = () =>{
        StageImgRef.current.click();
    };

    const saveStageImg = (e) => {
        const uploadStageImg = new FormData();
        uploadStageImg.append('directoryPath', "stage");
        uploadStageImg.append('upload', e.target.files[0]);
        Axios({
            method: "post",
            url: "/api/lv1/os/imgupload",
            data: uploadStageImg,
            headers: { "Content-Type": "multipart/form-data" }
        }).then(res => {
            setUploadStageImgName(res.data);
        }).catch(error => {
            console.log(error);
        })
        setUploadStageImgName(uploadStageImg);
        const StageImgfile = StageImgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(StageImgfile);
        reader.onload = () => {
            setStageImg(reader.result);
        };
    };
    
    const AddStageData = {
        title: StageTitle,
        address: StageAddress,
        maxlength: StagePw,
        tag: StageTags,
        genre: StageGenres,
        desc: StageDesc,
        nick: JSON.parse(sessionStorage.getItem("data") || localStorage.getItem('data')).nick,
        img: uploadStageImgName
    }

    const CreateStage = () => {
        if (StageTitle === "") {
            alert("정보를 입력해주세요.");
            return;
        }
        const CreateStageUrl = "/api/lv2/s/stage";
        Axios.post(CreateStageUrl, AddStageData)
            .then(res => {
                if (res.data) {
                    if (localStorage.getItem('data')) {
                        let d = JSON.parse(localStorage.getItem('data'));
                        d.stagetitle = StageTitle;
                        d.stageaddress = StageAddress;
                        localStorage.setItem('data',JSON.stringify(d));
                    } else if (sessionStorage.getItem('data')) {
                        let d = JSON.parse(sessionStorage.getItem('data'));
                        d.stagetitle = StageTitle;
                        d.stageaddress = StageAddress;
                        sessionStorage.setItem('data',JSON.stringify(d));
                    }
                    navigate(`${StageAddress}`);
                }
                else {
                    alert('생성실패');
                }
            })
            .catch((error) => {
                alert("실패에러" + error)
            })
    };


    return (
        <div className='CSMWrapper'>
            <div className='CSMContent CSMlv1'>
                <div className='btnCSM'  onClick={onClose}>{<ArrowBackIcon/>}</div>
                <div className='btnCSMTitle'>
                    <h1 style={{ textAlign: 'center' }}>
                        스테이지  {types ? '생성' : '수정'}
                    </h1>
                </div>
                <div className='btnCSM'>{!types && <LayersClearIcon />}</div>
            </div>
            <div className='CSMContent CSMlv2'>
                {/* File input element */}
                <input
                    className='CSMFileInput' // Add a class name to style the file input element if needed
                    type='file'
                    accept='image/*'
                    multiple
                    ref={StageImgRef} // Connect the ref to the file input element
                    onChange={saveStageImg} // Handle the file selection in the onChange event
                />
                {/* Display the selected image or a background image */}
                <div
                    className='CSMImg'
                    src={StageImg}
                    style={{ backgroundImage: StageImg ? `url(${StageImg})` : 'none' }}
                    onClick={onClickImageUpload}
                // Trigger the file input click when the image is clicked
                />
                <div className='CSMInfo'>
                    <input className='CSMInput' name='title' placeholder='제목' value={StageTitle} onChange={StageTitleOnChange} />
                    <input className='CSMInput' name='maxlength' type='number' min={'0'} placeholder='최대길이(초), 0 무제한' value={StagePw} onChange={StagePwOnChange} />
                    <input className='CSMInput' name='tags' value={StageTags} onChange={StageTagsOnChange} placeholder='태그 ( , 로 구분) / 최대 4개' />
                    <input className='CSMInput' name='genres' value={StageGenres}  onChange={StageGenresOnChange} placeholder='장르 ( , 로 구분) / 최대 4개' />
                </div>
            </div>
            <div className='CSMContent CSMlv3'>
                <input className='CSMDetail' name='description' value={StageDesc} onChange={StageDescOnChange} placeholder='간단한 소개를 입력하세요. (최대 50자)' />
            </div>
            <div className='CSMContent CSMlv4'>
                <button onClick={handleCreateOrUpdate}>
                    스테이지 {types ? '생성' : '수정'}
                </button>
            </div>
        </div>
    );
};

export default CSM;