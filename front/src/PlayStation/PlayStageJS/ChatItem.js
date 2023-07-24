import React from 'react';


const ChatItem = ({data}) => {
    return (
        <div className="stage-chat-item">
            <img
                className="stage-chat-item-user-img"
                src={data.img}
                alt='profileImg' />

            <div className="stage-chat-item-detail">
                <div className="stage-chat-item-header">
                    <div className="stage-chat-item-writer">{data.nick}</div>

                    <div className="stage-chat-item-timestamp">{data.date}</div>
                </div>

                <div className="stage-chat-item-msg">{data.msg}</div>
            </div>
        </div>
    );
};

export default ChatItem;