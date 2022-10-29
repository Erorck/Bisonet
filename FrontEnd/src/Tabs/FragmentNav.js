import React, { Component, useState } from "react";
import { FragmentButton } from "../components/FragmentButton";
import { FragmentContent } from "../components/FragmentContent";
import { LatestNews } from '../components/LatestNews';
import { UpcommingEvents } from '../components/UpcommingEvents';
import { CoursesList } from "../Lists/Courses";
import Coding from '../resources/coding.jpeg';

const ListOfCourses = (<CoursesList Courses={[
    {
        CourseID: '1',
        CourseImg: `${Coding}`,
        CourseName: 'Curso 1',
        CourseType: 'Presencial',
        From: '14',
        To: '17'
    },
    {
        CourseID: '2',
        CourseImg: `${Coding}`,
        CourseName: 'Curso 2',
        CourseType: 'En linea',
        From: '14',
        To: '17'
    },
    {
        CourseID: '3',
        CourseImg: `${Coding}`,
        CourseName: 'Curso 3',
        CourseType: 'Presencial',
        From: '14',
        To: '17'
    }
]} />)

export const FragmentNav = () => {

    const [activeTab, setActive] = useState(1);

    return (
        <div>
            <div className="FragmentHeader">
                <FragmentButton Title={'Noticias'} id={1} activeTab={activeTab} setActiveTab={setActive} />
                <FragmentButton Title={'Materias'} id={2} activeTab={activeTab} setActiveTab={setActive} />
            </div>
            <div className="FragmentsContainer">
                <FragmentContent id={1} activeTab={activeTab}>
                    <LatestNews />
                    <UpcommingEvents />
                </FragmentContent>
                <FragmentContent id={2} activeTab={activeTab}>
                    {ListOfCourses}
                </FragmentContent>
            </div>
        </div>
    )

}