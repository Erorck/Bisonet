import React, { useEffect, useRef } from "react";
import { useState } from "react";
import AdminMenu from "../components/AdminMenu";
import { Footer } from "../components/Footer";
import '../css/adminGrupos.css'
import { GroupsList } from "../Lists/Groups";
import { Table } from "reactstrap";
import styled from "styled-components"
import { PopUpForm } from "../utils/PopUp";
import { GroupsPopUp } from "../PopUps/PopUpGroups";
import Cookies from "universal-cookie";
import api from "../api.json"
import axios from "axios";
import { Navigate } from "react-router-dom";

const CenteredButton = styled.button`
position: absolute;
right: 50%;
transform: translateX(50%);
margin-top: 10px;
`

export const GroupsPage = () => {

    const [validated, HasBeenValidated] = useState(false)
    const [auth, IsAuthorized] = useState(false)
    const [Grupo, setGrupo] = useState([])
    const [Active, activePopUp] = useState({ state: false, type: "new", id: "", group_teacher: "0", course: "0", semester: "0", year: "0", group_members: [] });

    const HandleActive = () => {
        activePopUp({ state: true, type: "new", id: "", group_teacher: "", course: "", semester: "", year: "", group_members: []})
    }

    const url = api.link;

    useEffect(() => {
        onLoad();
    }, [])

    useEffect(() => {
        GetGroups();
    }, [])

    async function onLoad() {

        const cookies = new Cookies();

        const config = {
            headers: { 'Authorization': `Bearer ${cookies.get("userToken")}` }
        }

        await axios.get(url + 'users/' + cookies.get("userId"), config).then(response => {

            IsAuthorized(true)

        }).catch(error => {

        })

        HasBeenValidated(true)

    }

    async function GetGroups() {

       const cookies = new Cookies();

        const config = {
            headers: { 'Authorization': `Bearer ${cookies.get("userToken")}` },
        }

        await axios.get(url + 'groups/',  config).then(response => {

            var GroupsFinal = [];
            for (let i = 0; i < response.data.data.length; i++) {
                if(response.data.data[i].isActive)
                {
                    GroupsFinal.push(response.data.data[i]);
                }
            }
            setGrupo(GroupsFinal);
            console.log(GroupsFinal);
        
        }).catch(error => {
            console.log(error.response);
        })
    }

    if (!validated) {
        return null;
    }

    return (
        <div className="MainPage">
            {auth ? <div>
                <AdminMenu />
                {Active.state ? 
                    <GroupsPopUp setActive={activePopUp} mode={Active.type} prevInfo={{ group_teacher: Active.group_teacher, course: Active.course, semester:Active.semester, year: Active.year, group_members: [] }} id={Active.id}/>
                 : null}
                <div className="BodyContent">
                    <div className="BodyHeader">
                        <span>Grupos</span>
                    </div>
                    <Table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Semestre</th>
                                <th scope="col">Materia</th>
                                <th scope="col">Año</th>
                                <th scope="col">Maestro</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {Grupo.length ? <GroupsList Changer={activePopUp} Groups={Grupo}></GroupsList> : null}
                        </tbody>
                    </Table >
                    <CenteredButton onClick={HandleActive} className="btn btn-outline-light">Añadir grupo</CenteredButton>
                </div>
                <Footer />
            </div> : <Navigate to={"/login"} replace={true} />}
        </div>
    )
}