import React, {useEffect, useState} from 'react';
import Aris from "../MainIMG/Aris.gif";
import HeartImg from "../MainIMG/Heart.png";
import dayjs from 'dayjs';
import Axios from "axios";

function PlayLsitRankingLikeTop(props) {
    const bucketURl = process.env.REACT_APP_BUCKET_URL;
    const [curr, setCurr] = useState(1);
    const [cpp, setCpp] = useState(50);
    const [orderByDay ,setOrderByDay] = useState(false);
    const [likeTop50, setLikeTop50] = useState([]);

    useEffect(()=>{
        const LikeTop50Url = "/api/lv0/p/list";
        Axios.get(LikeTop50Url,{ params: {orderByDay, curr, cpp}})
            .then(res =>
                setLikeTop50(res.data));
    },[]);
    return (
        <div className="playlistrankinglistwapper">
            <div className="playlistrankinglistwrapper">
                <div className="playlistrankinglistitemswrappe">
                    {
                        likeTop50.map((item, idx)=>
                            <div className="playlistrankinglistitem" key={idx}>
                                <div className="playlistrankinglistitemnumber">{idx+1}</div>
                                <img
                                    className="playlistrankinglistitemthumbna-icon"
                                    alt=""
                                    src={`${bucketURl}/playlist/${item.img}`}
                                />
                                <div className="playlistrankinglistiteminfo1">
                                    <div className="playlistrankinglistitemtitle">
                                        {item.title}
                                    </div>
                                    <div className="playlistrankinglistitemowner">
                                        {item.nick}
                                    </div>
                                </div>
                                <div className="playlistrankinglistiteminfo2">
                                    <div className="playlistrankinglistitemmakeday">
                                        생성일 : {dayjs(item.makeday).format('YYYY-MM-DD')}
                                    </div>
                                    <div className="playlistrankinglistitemlikegro">
                                        <div className="playlistrankinglistitemlikenum">{item.likescount}</div>
                                        <img
                                            className="playlistrankinglistitemlikeico-icon"
                                            alt=""
                                            src={HeartImg}
                                        />
                                    </div>
                                    <div className="playlistrankinglistitemtags">
                                        <div className="playlistrankinglistitemcategor">
                                            {item.genre===""?null:"#" + item.genre?.split(",")[0]}
                                        </div>
                                        <div className="playlistrankinglistitemcategor">
                                            {item.tag === ""?null:"#" + item.tag?.split(",")[0]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="playlistrankinglisttitle">좋아요 TOP</div>
        </div>
    );
}

export default PlayLsitRankingLikeTop;