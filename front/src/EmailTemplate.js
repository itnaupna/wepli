import React from 'react';
import { Link } from 'react-router-dom';

// 이메일 인증 전송 시 확인할 템플릿
const EmailTemplate = () => {
    
  return (
    <div style={{backgroundImage: `url(https://kr.object.ncloudstorage.com/wepli/email_back.png)`, width: '800px', height: '750px', margin: '80px auto 0 auto' }}>
        <div style={{textAlign:'center', backgroundColor:'white',margin:'200 auto 0 auto', width:'200px', display:'inline-block'}}>
            <span style={{fontSize:'39px',fontWeight:'bold',color:'#5DC1FE'}}>157361</span>
        </div>

        <div style={{position:'relative', top:'500px', left:'350px'}}>
            <a href='http://localhost:3001' style={{textDecoration:'none',color:'black'}}>
                <span>wepli 바로가기</span>
            </a>
        </div>
    </div>
  );
};

export default EmailTemplate;