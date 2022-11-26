import React from "react";
import { CourseCard } from "../components/CoursesCard";
import Coding from '../resources/coding.jpeg';

export class AdCoursesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Courses: props.Courses
        }
    }

    render() {
        var courses = this.state.Courses[0] || [];

        console.log(this.state.Courses[0])

        return (
            courses.map((x, i) => (
                <CourseCard key={i} Image={Coding} Title={x.course_name} Cycle={x.semester} id={x._id} especialty={x.career_especialty} />
            ))
        )
    }
}