import React from "react";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import api from "../api.json"

export const GroupCard = ({ Cycle, Name, Group, Teacher, activePopUp, id }) => {

    const HandleActive = () => {
        //console.log({ state: true, type: "edit", id: id, group_teacher: Teacher, course: Name, semester: Cycle, year: Group, group_members: [] });
        activePopUp({ state: true, type: "edit", id: id, group_teacher: Teacher, course: Name, semester: Cycle, year: Group, group_members: [] })
    }

    const DeleteGroup = async () =>
    {
        const url = api.link;
        const cookies = new Cookies();
        const config = {
            headers: { 'Authorization': `Bearer ${cookies.get("userToken")}` }
        }

       const data = {"isActive": false};

        await axios.patch(url + 'groups/'+id, data, config).then(response => {

            console.log(response.data)

        }).catch(error => {

            console.log(error.response.data)

        })
    }

    return (
        <tr>
            <td >{Cycle}</td>
            <td>{Name}</td>
            <td>{Group}</td>
            <td>{Teacher}</td>
            <td> <button onClick={HandleActive} type="button" className="btn btn-outline-info">Modificar</button></td>
            <td> <button type="button" onClick={DeleteGroup} className="btn btn-outline-danger">Eliminar</button></td>
        </tr>
    )
}