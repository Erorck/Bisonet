import React from "react";
import { CourseCard } from "../components/CoursesCard";

export class AdCoursesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Courses: props.Courses
        }
    }

    render() {
        var courses = this.state.Courses || [];
        return (
            courses.map((x, i) => (
                <CourseCard key={i} Image={x.Image} Title={x.Title} Cycle={x.Cycle} />
            ))
        )
    }
}