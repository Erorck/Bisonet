import React from "react";
import AdminMenu from "../components/AdminMenu";
import { Footer } from "../components/Footer";
import '../css/adminGrupos.css'
import { GroupsList } from "../Lists/Groups";
import { Table } from "reactstrap";
const ListOfGroups = (<GroupsList Groups={[
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

export const GroupsPage = () => {
    return (
        <div className="MainPage">
            <AdminMenu />
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
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ListOfGroups}
                    </tbody>
                </Table >
            </div>
            <Footer />
        </div>
    )
}