import React from 'react';

const ChatItem = () => {
    return (
        <div className="stage-chat-item">
            <img
                className="stage-chat-item-user-img"
                src="stage-chat-item-user-img.png"
                alt='profileImg' />

            <div className="stage-chat-item-detail">
                <div className="stage-chat-item-header">
                    <div className="stage-chat-item-writer">JJ the Master</div>

                    <div className="stage-chat-item-timestamp">07/14 22:17</div>
                </div>

                <div className="stage-chat-item-msg">대화내역 표시하세용</div>
            </div>
        </div>
    );
};

export default ChatItem;