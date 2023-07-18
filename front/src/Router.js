import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Stage from './Stage';
import Board from './Board';
import EmailTemplate from './EmailTemplate';

function Router(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}></Route>
                <Route path="/stage" element={<Stage/>}></Route>
                <Route path="/board" element={<Board/>}></Route>
                <Route path="/email" element={<EmailTemplate/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;