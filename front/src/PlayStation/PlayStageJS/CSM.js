import React, { useRef, useState } from 'react';
import './CSM.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import Upload from '../PlayStageImage/Icon/upload.svg';
import axios, { Axios } from 'axios';


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
const CSM = ({ types }) => {
    const initialAddress = makeAddress(5);//address길이를 5로 설정
    const [uploadImgName, setuploadStageImgName] = useState(null);
    const StageImgRef = useRef();
    const [stageData, setStageData] = useState({
        address: initialAddress,
        title: '',
        password: null,
        tags: '',
        genres: '',
        description: '',
        img: null,
    });
    const saveStageImg = (e) => {
        const uploadStageImg = new FormData();
        uploadStageImg.append('directoryPath', "stage");
        uploadStageImg.append('upload', e.target.files[0]);
        axios({
            method: "post",
            url: "/api/lv1/os/imgupload",
            data: uploadStageImg,
            headers: { "Content-Type": "multipart/form-data" }
        }).then(res => {
            setuploadStageImgName(res.data);
        }).catch(error => {
            console.log(error);
        })
        // setUploadStageImgName(uploadStageImg);
        const ImgFile = StageImgRef.current.files[0];
    }
    const fileInputRef = useRef(null);
    const onUpload = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            setStageData({ ...stageData, img: reader.result });
        };
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStageData({ ...stageData, [name]: value });
    };
    const CreateStage = () => {
        fetch('api/lv2/s/stage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: stageData.address,
                title: stageData.title,
                desc: stageData.description,
                genre: stageData.genres,
                tag: stageData.tags,
                pw: stageData.password,
                img: stageData.img,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    };
    //파일 업로드 /미리보기 이벤트
    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // ref를 사용하여 파일 업로드 input 요소 클릭 이벤트 호출
        }
    };
    //스테이지 생성 버튼을 클릭할 때 서버로 데이터를 보내는 함수
    return (
        <div className='CSMWrapper'>
            <div className='CSMContent CSMlv1'>
                <div className='btnCSM'><ArrowBackIcon /></div>
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
                    ref={fileInputRef} // Connect the ref to the file input element
                    style={{ display: 'none' }} // Hide the file input element
                    onChange={onUpload} // Handle the file selection in the onChange event
                />
                {/* Display the selected image or a background image */}
                <div
                    className='CSMImg'
                    style={{ backgroundImage: stageData.img ? `url(${stageData.img})` : '' }}
                    onClick={handleImageClick} // Trigger the file input click when the image is clicked
                />
                <div className='CSMInfo'>
                    <input className='CSMInput' name='title' placeholder='제목' value={stageData.title} onChange={handleInputChange} />
                    <input className='CSMInput' name='pw' placeholder='비밀번호, 입력시 비밀방이 됩니다.' value={stageData.pw || ''} type='password' onChange={handleInputChange} />
                    <input className='CSMInput' name='tag' value={stageData.tags} onChange={handleInputChange} placeholder='태그 ( , 로 구분) / 최대 4개' />
                    <input className='CSMInput' name='genre' value={stageData.genres} onChange={handleInputChange} placeholder='장르 ( , 로 구분) / 최대 4개' />
                </div>
            </div>
            <div className='CSMContent CSMlv3'>
                <input className='CSMDetail' name='description' value={stageData.description} onChange={handleInputChange} placeholder='간단한 소개를 입력하세요. (최대 50자)' />
            </div>
            <div className='CSMContent CSMlv4'>
                <button onClick={CreateStage}>
                    스테이지 {types ? '생성' : '수정'}
                </button>
            </div>
        </div>
    );
};

export default CSM;