import React, { useState } from "react";
import styled from "styled-components";
import { CoursesPopUp } from "../PopUps/PopUpCourses";

const ButtonSpace = styled.div`
    display: flex;
    justify-content: space-evenly;

    button {
        margin: 0 10px;
    }
`

export const CourseCard = ({ Image, Title, Cycle, id, especialty }) => {

    const [Active, activePopUp] = useState(false)

    const HandleActive = () => {
        activePopUp(true)
    }

    return (
        <div className="CourseCardAdm">
            {Active ? <CoursesPopUp activePopUp={activePopUp} mode={"edit"} prevInfo={{ course_name: Title, semester: Cycle, career_especialty: especialty }} id={id} /> : null}
            <img src={Image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{Title}</h5>
                <p className="card-text">{"Semestre: " + Cycle}</p>
                <ButtonSpace>
                    <button onClick={HandleActive} type="button" className="btn btn-outline-info">Editar</button>
                    <button type="button" className="btn btn-outline-danger">Eliminar</button>
                </ButtonSpace>
            </div>
        </div >
    )
}