import React from "react";
import { Course } from "../components/Course";
import CourseImg from '../resources/coding.jpeg';

export class CoursesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Courses: props.Courses
        }
    }

    render() {
        var Courses = this.state.Courses || [];
        return (
            Courses.map((x, i) => (
                <Course key={i} CourseID={x.CourseID} CourseImg={CourseImg} CourseName={x.CourseName} CourseType={x.CourseType} FromSchedule={x.From} ToSchedule={x.To} />
            ))
        )
    }
}