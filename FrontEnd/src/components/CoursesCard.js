import React from "react";

export const CourseCard = ({ Image, Title, Cycle }) => {
    return (
        <div className="CourseCardAdm">
            <img src={Image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{Title}</h5>
                <p className="card-text">{Cycle}</p>

                <button type="button" className="btn btn-outline-danger">Eliminar</button>

            </div>
        </div >
    )
}