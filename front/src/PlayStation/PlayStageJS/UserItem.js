import React from 'react';

const UserItem = ({ data }) => {
    const BUCKET_URL = process.env.REACT_APP_BUCKET_URL;
    return (
        <div className="stage-people-item">
            <img className="stage-people-img" src={`${BUCKET_URL}/profile/${data.img}`} alt='profileImg' />
            <div className="stage-people-nickname">{data.nick} {data.addr === window.location.pathname.split('/')[2] ? "👑" : null}</div>
        </div>
    );
};

export default UserItem;