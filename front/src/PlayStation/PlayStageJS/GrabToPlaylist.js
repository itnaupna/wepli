import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { LoginStatusAtom } from '../../recoil/LoginStatusAtom';
import axios from 'axios';
import { doGrab } from '../../recoil/StageDataAtom';

const GrabToPlaylist = ({data}) => {
    const IsLogin = useRecoilValue(LoginStatusAtom);
    const [myPlaylists, setMyPlaylists] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);
    const loadMyPlaylists = async () => {
        if (!IsLogin) return;
        let request = await axios.get("/api/lv1/p/playlist");
        setMyPlaylists(request.data);
        setIsLoaded(true);
    }
    const selectRef = useRef();

    useEffect(() => {
        loadMyPlaylists()
    }, []);

    return (
        <div className='grabtoplaylistdiv' >
            {isLoaded ? (
                <select style={{ height: '22px' }} disabled={myPlaylists.length === 0} ref={selectRef}>
                    {myPlaylists.length > 0
                        ? myPlaylists.map((v, i) => (
                              <option key={i} value={v.idx}>
                                  {v.title} ({v.songscount})
                              </option>
                          ))
                        : <option disabled>재생목록이 없습니다</option>
                    }
                </select>
            ) : (
                <select style={{ height: '22px' }} disabled>
                    <option>재생목록을 불러오는 중입니다.</option>
                </select>
            )}
            <div onClick={()=>{doGrab(selectRef.current.value, data.id.videoId);}}>
                ➕
            </div>
            <div>
                ❌
            </div>
        </div>
    );
};

export default GrabToPlaylist;