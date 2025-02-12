import { useState } from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/home";
import PostDetail from "../pages/posts/detail";
import NewPost from "../pages/posts/new";
import EditPost from "../pages/posts/edit";
import Profile from "../pages/profile";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import PostsPage from "../pages/posts";

interface RouterProps {
    isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {
    // firebase auth가 인증되었으면 true, 아니면 false 로직 추가
    return (
        <div>
            <Routes>
                {isAuthenticated ? (
                    <>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/posts' element={<PostsPage />}></Route>
                        <Route path='/posts/new' element={<NewPost />}></Route>
                        <Route path='/posts/:id' element={<PostDetail />}></Route>
                        <Route path='/posts/edit/:id' element={<EditPost />}></Route>
                        <Route path='/profile' element={<Profile />}></Route>
                        {/**Navigate를 이용해서 지정하지 않은 path값이 들어올 시 강제로 홈으로 이동 */}
                        <Route path='*' element={<Navigate replace to='/'></Navigate>}></Route>
                    </>
                ) : (
                    <>
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/signup' element={<SignupPage />} />
                        <Route path='*' element={<LoginPage />} />
                    </>
                )}
            </Routes>
        </div>
    );
}
