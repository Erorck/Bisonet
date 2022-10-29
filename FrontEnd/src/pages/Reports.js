import React from "react";
import AdminMenu from "../components/AdminMenu";
import { Footer } from "../components/Footer";
import { Table } from "reactstrap";
import '../css/reportes.css'

export const ReportsPage = () => {
    return (
        <div className="MainPage">
            <AdminMenu />
            <div className="BodyContent">
                <div className="BodyHeader">
                    <span>Reportes</span>
                </div>
                <div className="conteiner">
                    <div className="primero">
                        <button type="button" className="btn btn-primary">Materia con más grupos</button>
                        <button type="button" className="btn btn-primary">Semestres con más materias</button>
                        <button type="button" className="btn btn-primary">Maestros con más materias</button>
                        <button type="button" className="btn btn-primary">Grupos con más alumnos</button>
                    </div>
                    <div className="segundo">
                        <Table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Materia</th>
                                    <th scope="col">Grupos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Estructura de datos</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>Modelado Organico</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>Cinematografia</td>
                                    <td>2</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}