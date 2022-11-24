import React from "react";
import { useState } from "react";
import styled from "styled-components";
import AdminMenu from "../components/AdminMenu";
import { Footer } from "../components/Footer";
import { AdCoursesList } from "../Lists/AdCourses";
import { CoursesPopUp } from "../PopUps/PopUpCourses";
import Coding from '../resources/coding.jpeg';
import '../css/adminMateria.css'
import '../css/adminGrupos.css'
import '../css/adminPost.css'

const ListOfCourses = (<AdCoursesList Courses={[
    {
        Image: Coding,
        Title: 'Programación web 1',
        Cycle: 'Segundo semestre'
    },
    {
        Image: Coding,
        Title: 'Programación web 2',
        Cycle: 'Segundo semestre'
    },
    {
        Image: Coding,
        Title: 'CUltura de la paz',
        Cycle: 'Segundo semestre'
    },
    {
        Image: Coding,
        Title: 'Programación web 1',
        Cycle: 'Segundo semestre'
    },
    {
        Image: Coding,
        Title: 'Programación web 2',
        Cycle: 'Segundo semestre'
    },
    {
        Image: Coding,
        Title: 'Cultura de la paz',
        Cycle: 'Segundo semestre'
    }
]} />)

const CenteredButton = styled.button`
position: absolute;
right: 50%;
transform: translateX(50%);
margin-top: 10px;
`

export const CoursesPage = () => {

    const [Active, activePopUp] = useState(false)

    const HandleActive = () => {
        activePopUp(true)
    }

    return (
        <div className="MainPage">
            <AdminMenu />
            <div className="BodyContent">
                {Active ? <CoursesPopUp activePopUp={activePopUp}></CoursesPopUp> : null}
                <div className="BodyHeader">
                    <span>Materias</span>
                </div>
                <div className="materias">
                    {ListOfCourses}
                </div>
                <CenteredButton className="btn btn-outline-light" onClick={HandleActive}>Añadir materia</CenteredButton>
            </div>
            <Footer />
        </div>
    )
}