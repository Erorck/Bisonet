import '../css/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import UanlPage from '../pages/Uanl';
import FcfmPage from '../pages/Fcfm';
import LmadPage from '../pages/Lmad';
import { ProfilePage } from '../pages/Profile';
import { CoursePage } from '../pages/Course';
import { LoginPage } from '../pages/Login';
import { RegisterPage } from '../pages/Register';
import { ReportsPage } from '../pages/Reports';
import { PostsPage } from '../pages/Post';
import { CoursesPage } from '../pages/AdminCourses';
import { GroupsPage } from '../pages/Groups';
import { NewPage } from '../pages/New';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<MainPage />}></Route>
        <Route exact path='/uanl' element={<UanlPage />}></Route>
        <Route exact path='/fcfm' element={<FcfmPage />}></Route>
        <Route exact path='/lmad' element={<LmadPage />}></Route>
        <Route exact path='/materia' element={<CoursePage />}></Route>
        <Route exact path='/noticia' element={<NewPage />}></Route>
        <Route exact path='/perfil' element={<ProfilePage />}></Route>
        <Route exact path='/login' element={<LoginPage />}></Route>
        <Route exact path='/registro' element={<RegisterPage />}></Route>
        <Route exact path='/administrar-publicaciones' element={<PostsPage />}></Route>
        <Route exact path='/administrar-materias' element={<CoursesPage />}></Route>
        <Route exact path='/administrar-grupos' element={<GroupsPage />}></Route>
        <Route exact path='/reportes' element={<ReportsPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
