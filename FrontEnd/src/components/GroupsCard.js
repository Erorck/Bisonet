import React from "react";

export const GroupCard = ({ Cycle, Name, Group, Teacher, activePopUp }) => {

    const HandleActive = () => {
        activePopUp({ state: true, type: "edit" })
    }

    return (
        <tr>
            <td >{Cycle}</td>
            <td>{Name}</td>
            <td>{Group}</td>
            <td>{Teacher}</td>
            <td> <button onClick={HandleActive} type="button" className="btn btn-outline-info">Modificar</button></td>
            <td> <button type="button" className="btn btn-outline-danger">Eliminar</button></td>
        </tr>
    )
}