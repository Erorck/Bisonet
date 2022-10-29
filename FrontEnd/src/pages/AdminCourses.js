import React from "react";
import AdminMenu from "../components/AdminMenu";
import { Footer } from "../components/Footer";
import { AdCoursesList } from "../Lists/AdCourses";
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
        Title: 'CUltura de la paz',
        Cycle: 'Segundo semestre'
    }
]} />)

export const CoursesPage = () => {
    return (
        <div className="MainPage">
            <AdminMenu />
            <div className="BodyContent">
                <div className="BodyHeader">
                    <span>Materias</span>
                </div>
                <div className="materias">
                    {ListOfCourses}
                </div>
            </div>
            <Footer />
        </div>
    )
}