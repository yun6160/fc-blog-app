import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/home";
import PostList from "../pages/posts";
import PostDetail from "../pages/posts/detail";
import NewPost from "../pages/posts/new";
import EditPost from "../pages/posts/edit";
import Profile from "../pages/profile";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";

export default function Router() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/posts' element={<PostList />}></Route>
                <Route path='/posts/new' element={<NewPost />}></Route>
                <Route path='/posts/:id' element={<PostDetail />}></Route>
                <Route path='/posts/edit/:id' element={<EditPost />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/signup' element={<SignupPage />}></Route>
                {/**Navigate를 이용해서 지정하지 않은 path값이 들어올 시 강제로 홈으로 이동 */}
                <Route path='*' element={<Navigate replace to='/'></Navigate>}></Route>
            </Routes>
        </div>
    );
}
