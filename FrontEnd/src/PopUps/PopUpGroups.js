import React from "react";
import { PopUpForm } from "../utils/PopUp";
import { SearchObjectSelection, SelectionBoxObject, SelectionBoxSingle } from "../utils/SelectionBox";
import { YearsList } from "../types/Dates";

const Maestros = [
    {
        id: 1,
        name: "Maestro 1"
    },
    {
        id: 2,
        name: "Maestro 2"
    }
]

const Cursos = [
    {
        id: 1,
        name: "Curso 1"
    },
    {
        id: 2,
        name: "Curso 2"
    }
]

const Semestres = [
    {
        id: 1,
        name: "Primero"
    },
    {
        id: 2,
        name: "Segundo"
    }
]

const Users = [
    {
        name: "Sergio Perez",
        id: 1
    },
    {
        name: "Karen García",
        id: 2
    },
    {
        name: "Daniel Gonzales",
        id: 3
    },
    {
        name: "Sergio Perez",
        id: 4
    },
    {
        name: "Karen García",
        id: 5
    },
    {
        name: "Daniel Gonzales",
        id: 6
    }
]

export const GroupsPopUp = ({ setActive, mode }) => {

    return (
        <PopUpForm Header={mode === "edit" ? "Editar grupo" : "Alta de grupo"} activate={setActive}>
            <div className="row mb-4">
                <SelectionBoxObject headName="Maestro" placeholder="seleciona Maestro" list={Maestros} />
                <SelectionBoxObject headName="Curso" placeholder="seleciona Curso" list={Cursos} />
                <SelectionBoxObject headName="Semestre" placeholder="seleciona Semestre" list={Semestres} />
            </div>
            <div className="row mb-4">
                <SelectionBoxSingle headName="Año" placeholder="seleciona Año" list={YearsList(10)} />
                <SelectionBoxSingle headName="Estado" placeholder="seleciona estado" list={["Activo", "Inactivo"]} />
            </div>
            <div className="row mb-4">
                <SearchObjectSelection headName="Seleccionar Alumnos" list={Users} />
            </div>
        </PopUpForm>
    )
}