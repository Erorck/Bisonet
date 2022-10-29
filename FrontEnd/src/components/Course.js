import React from "react";
import { Link, Redirect } from "react-router-dom";

export const Course = ({ CourseID, CourseImg, CourseName, CourseType, FromSchedule, ToSchedule }) => {
    return (
        <Link to={`/materia?id=${CourseID},name=${CourseName}`} style={{ textDecoration: 'none' }}>
            <div className="CourseCard">
                <img className="col-4" src={CourseImg} alt='...' />
                <span className="col-4">{CourseName}</span>
                <div className="CourseInfoTag col-4">
                    <div className="Type">
                        <span>Oferta: {CourseType}</span>
                    </div>
                    <div className="Schedule">
                        <span>{FromSchedule} - {ToSchedule} hrs</span>
                    </div>
                </div>
            </div>
        </Link >
    )
}