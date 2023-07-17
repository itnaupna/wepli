import React from 'react';
import '../PlayStageCss/PlayStage.css';
import Check from '../PlayStageImage/Icon/Check.svg';
import StageButtonChatIcon from '../PlayStageImage/Icon/StageButtonChatIcon.svg';
import StageButtonDownIcon from '../PlayStageImage/Icon/StageButtonDownIcon.svg';
import StageButtonUpIcon from '../PlayStageImage/Icon/StageButtonUpIcon.svg';
import StageButtonGrabIcon from '../PlayStageImage/Icon/StageButtonGrabIcon.svg';
import StageButtonPeopleIcon from '../PlayStageImage/Icon/StageButtonPeopleIcon.svg';
import StageChatSendButton from '../PlayStageImage/Icon/StageChatSendButton.svg';
import StagePeopleMasterIcon from '../PlayStageImage/Icon/StagePeopleMasterIcon.svg';
import Vector from '../PlayStageImage/Icon/Vector.svg';
import StageChatItemUserImg from '../PlayStageImage/img/StageChatItemUserImg.png';
import StagePeopleImg from '../PlayStageImage/img/StagePeopleImg.png';

function PlayStage(props) {
    return (
<div className="stage">
<div className="stageleft">
<div className="stageleftheader">
<div className="stageleftbuttongroupa">
<div className="stagebuttonstage">
<div className="stagebuttonstagetext">스테이지</div>
</div>
<div className="stagebuttonqueue">
<div className="stagebuttonstagetext">대기열</div>
</div>
</div>
<div className="stageleftbuttongroupb">
<div className="stagebuttongrab">
<img className="stagebuttongrabicon" alt="" src={StageButtonGrabIcon} />
</div>
<div className="stagebuttongrab">
<img className="stagebuttongrabicon" alt="" src={StageButtonUpIcon} />
</div>
<div className="stagebuttongrab">
<img className="stagebuttongrabicon" alt="" src={StageButtonDownIcon} />
</div>
<div className="stagebuttonqueue">
<div className="stagebuttonstagetext">SKIP</div>
</div>
</div>
</div>
<div className="stageleftbody" />
</div>
<div className="stageright">
<div className="stagerightheader">
<div className="stagebuttonchat">
<img className="stagebuttonchaticon" alt="" src={StageButtonChatIcon} />
</div>
<div className="stagebuttonpeople">
<img className="stagebuttonpeopleicon" alt="" src={StageButtonPeopleIcon} />
<div className="stagebuttonpeoplecount">0</div>
<div className="stagebuttonstagetext">+</div>
<div className="stagebuttonstagetext">0</div>
</div>
</div>
<div className="stagechatwrapper">
<div className="stagechatbody">
<div className="stagechatitem">
<img className="stagechatitemuserimg-icon" alt="" src={StageChatItemUserImg} />
<div className="stagechatitemdetail">
<div className="stagechatitemheader">
<div className="stagebuttonstagetext">JJ the Master</div>
<div className="stagechatitemtimestamp">07/14 22:17</div>
</div>
<div className="stagechatitemmsg">대화내역 표시하세용</div>
</div>
</div>
</div>
<img className="stagechattail-icon" alt="" src="StageChatTail.svg" />
</div>
<div className="stagechatwrapper">
<div className="stagepeoplebody">
<div className="stagepeopleitem">
<img className="stagechatitemuserimg-icon" alt="" src={StagePeopleImg} />
<div className="stagebuttonstagetext">JJ the Master</div>
<img className="stagepeoplemastericon" alt="" src={StagePeopleMasterIcon} />
<img className="stagepeoplemastericon" alt="" src={Check} />
</div>
</div>
</div>
</div>
</div>
    );
}

export default PlayStage;