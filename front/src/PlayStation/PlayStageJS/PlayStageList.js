import React, { useEffect, useState } from "react";
import '../PlayStageCss/s-l-p.css';
import SLPFollowBackIcon from '../PlayStageImage/Icon/SLPFollowBackIcon.svg';
import SLPFollowNextIcon from '../PlayStageImage/Icon/SLPFollowNextIcon.svg';
import StageItemBig from "./StageItemBig";
import ResultItem from "./ResultItem";
import CreateStageModal from "./CreateStageModal.js";
import axios from 'axios';
import { Link } from 'react-router-dom';

function PlayStageList(props) {
  const [modalOpen, setModalOpen] = useState(false);
  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };
  const [resItems, setResItems] = useState([]);
  useEffect(() => {
    axios.get("/api/lv0/s/stage", { params: { curr: 1, cpp: 6 } })
      .then(res => { setResItems(res.data); console.log(res.data); })
      .catch(res => console.log(res));
  }, []);

  return (
    <div className="slp">
      <div className="slptop">
        <div className="slpmystagewrapper">
          <StageItemBig />

        </div>
        <div className="slpfollowwrapper">
          <div className="slpfollowback">
            <img
              className="slpfollowbackicon"
              alt=""
              src={SLPFollowBackIcon}
            />
          </div>
          <StageItemBig />
          <div className="slpfollowback">
            <img
              className="slpfollowbackicon"
              alt=""
              src={SLPFollowNextIcon}
            />
          </div>
        </div>
      </div>
      <div className="slpbottom">
        <div className="slpsearchwrapper">
          <div className="slpsortwrapper">
            <div className="slpsort" />
          </div>
          <div className="slpsearchwrapper1">
            <div className="slpsearchtype" />
            <div className="slpsearchinput" />
          </div>
        </div>
        <div className="slpresult">
          {
            resItems.map((v, i) =>
              <Link to={"/stage/" + v.address}>
                <ResultItem data={v} key={i} />
              </Link>
            )
          }
        </div>
      </div>
    </div>
  )
}
export default PlayStageList;