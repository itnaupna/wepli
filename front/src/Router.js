import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Stage from './Stage';
import Board from './Board';

function Router(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}></Route>
                <Route path="/stage" element={<Stage/>}></Route>
                <Route path="/board" element={<Board/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;