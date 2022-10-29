import React from "react";

export const GroupCard = ({ Cycle, Name, Group, Teacher }) => {
    return (
        <tr>
            <td >{Cycle}</td>
            <td>{Name}</td>
            <td>{Group}</td>
            <td>{Teacher}</td>
            <td> <button type="button" className="btn btn-outline-danger">Eliminar</button></td>
        </tr>
    )
}