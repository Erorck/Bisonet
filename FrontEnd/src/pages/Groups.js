import React from "react";
import { useState } from "react";
import AdminMenu from "../components/AdminMenu";
import { Footer } from "../components/Footer";
import '../css/adminGrupos.css'
import { GroupsList } from "../Lists/Groups";
import { Table } from "reactstrap";
import styled from "styled-components"
import { PopUpForm } from "../utils/PopUp";
import { GroupsPopUp } from "../PopUps/PopUpGroups";

const CenteredButton = styled.button`
position: absolute;
right: 50%;
transform: translateX(50%);
margin-top: 10px;
`

export const GroupsPage = () => {

    const [Active, activePopUp] = useState({ state: false, type: "new" });

    const HandleActive = () => {
        activePopUp({ state: true, type: "new" })
    }

    const ListOfGroups = (<GroupsList Changer={activePopUp} Groups={[
        {
            Cycle: '1',
            Name: 'Animación tradicional de humanos y animales',
            Group: '1',
            Teacher: 'John Doe'
        },
        {
            Cycle: '2',
            Name: 'Estructura de datos',
            Group: '1',
            Teacher: 'John Doe'
        },
        {
            Cycle: '2',
            Name: 'Modelado Organico',
            Group: '1',
            Teacher: 'John Doe'
        },
        {
            Cycle: '3',
            Name: 'Cinematografia',
            Group: '1',
            Teacher: 'John Doe'
        },
    ]} />);

    return (
        <div className="MainPage">
            <AdminMenu />
            {Active.state ? <PopUpForm>
                <GroupsPopUp setActive={activePopUp} mode={Active.type} />
            </PopUpForm> : null}
            <div className="BodyContent">
                <div className="BodyHeader">
                    <span>Grupos</span>
                </div>
                <Table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Semestre</th>
                            <th scope="col">Materia</th>
                            <th scope="col">Grupo</th>
                            <th scope="col">Maestro</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ListOfGroups}
                    </tbody>
                </Table >
                <CenteredButton onClick={HandleActive} className="btn btn-outline-light">Añadir grupo</CenteredButton>
            </div>
            <Footer />
        </div>
    )
}