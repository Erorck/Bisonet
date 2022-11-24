import React from "react";
import { PopUpForm } from "../utils/PopUp";
import { SelectionBoxSingle } from "../utils/SelectionBox";
import { TextInput } from "../utils/InputTypes";

const Semestres = ["Primero", "Segundo", "Tercero"]
const Grupos = ["1", "2", "3"]

export const CoursesPopUp = ({ activePopUp, mode }) => {
    return (
        <PopUpForm Header={mode === "edit" ? "Editar materia" : "Alta materia"} activate={activePopUp}>
            <div className="row mb-4">
                <TextInput headName={"Nombre de materia"} placeholder={"Nombre de la materia"}></TextInput>
            </div>
            <div className="row mb-4">
                <SelectionBoxSingle headName={"Semestre"} placeholder={"Selecciona semestre"} list={Semestres}></SelectionBoxSingle>
                <SelectionBoxSingle headName={"Grupos"} placeholder={"Cantidad de grupos"} list={Grupos}></SelectionBoxSingle>
            </div>
        </PopUpForm>
    )
}
