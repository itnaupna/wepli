import Axios from 'axios';
import React, { useEffect, useState } from 'react';

function Stage(props) {
    const [data, setData] = useState("");
    const auth = () => {
        Axios.get("/api/lv2/auth2")
        .then(res => {
            setData(res.data);
        })
    }

    useEffect(() => {
        auth();
    }, [])
    return (
        <div>
            <h2>스테이지 = auth2</h2>
            {data}
        </div>
    );
}

export default Stage;