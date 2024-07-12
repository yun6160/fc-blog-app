import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Navigate, Link } from "react-router-dom";

function App() {
    return (
        <div>
            <ul>
                <li>
                    <Link to='/'>home</Link>
                </li>
                <li>
                    <Link to='/post'>post</Link>
                </li>
                <li>
                    <Link to='/post/:id'>post detail</Link>
                </li>
                <li>
                    <Link to='/new'>new</Link>
                </li>
                <li>
                    <Link to='/post/edit/:id'>edit</Link>
                </li>
                <li>
                    <Link to='/profile'>edit</Link>
                </li>
            </ul>
            <Routes>
                <Route path='/' element={<h2>home Page</h2>}></Route>
                <Route path='/post' element={<h2>post list page</h2>}></Route>
                <Route path='/new' element={<h2>post new</h2>}></Route>
                <Route path='/post/:id' element={<h2>post Detail page</h2>}></Route>
                <Route path='/post/edit/:id' element={<h2>post edit page</h2>}></Route>
                <Route path='/profile' element={<h2>profile</h2>}></Route>
                {/**Navigate를 이용해서 지정하지 않은 path값이 들어올 시 강제로 홈으로 이동 */}
                <Route path='*' element={<Navigate replace to='/'></Navigate>}></Route>
            </Routes>
        </div>
    );
}

export default App;
