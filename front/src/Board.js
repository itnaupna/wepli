import Axios from 'axios';
import React, { useEffect, useState } from 'react';

function Board(props) {
    const [data, setData] = useState("");
    const auth = () => {
        Axios.get("/api/lv1/auth1")
        .then(res => {
            setData(res.data);
        })
    }

    useEffect(() => {
        auth();
    }, [])
    return (
        <div>
            <h2>회원일때</h2>
            {data}
        </div>
    );
}

export default Board;