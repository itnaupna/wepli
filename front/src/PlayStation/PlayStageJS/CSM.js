import React from 'react';
import './CSM.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LayersClearIcon from '@mui/icons-material/LayersClear';

const CSM = ({types}) => {
    return (
        <div className='CSMWrapper'>
            <div className='CSMContent CSMlv1'>
                <div className='btnCSM'><ArrowBackIcon /></div>
                <div className='btnCSMTitle'>
                    <h1 style={{ textAlign: 'center' }}>
                        스테이지 정보 {types ? '생성' : '삭제'}
                    </h1>
                </div>
                <div className='btnCSM'>{!types && <LayersClearIcon />}</div>
            </div>
            <div className='CSMContent CSMlv2'>
                <div className='CSMImg' style={{backgroundImage:''}}/>
                <div className='CSMInfo'>
                    <input className='CSMInput' placeholder='제목' />
                    <input className='CSMInput' placeholder='비밀번호, 입력시 비밀방이 됩니다.' type='password'/>
                    <input className='CSMInput' placeholder='태그 ( , 로 구분) / 최대 4개' />
                    <input className='CSMInput' placeholder='장르 ( , 로 구분) / 최대 4개' />
                </div>
            </div>
            <div className='CSMContent CSMlv3'>
                <input className='CSMDetail' placeholder='간단한 소개를 입력하세요. (최대 50자)'/>
            </div>
            <div className='CSMContent CSMlv4'>스테이지 {types ? '생성' : '수정'}</div>
        </div>
    );
};

export default CSM;