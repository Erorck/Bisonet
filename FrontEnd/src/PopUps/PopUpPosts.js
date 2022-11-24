import React from "react";
import { PopUpForm } from "../utils/PopUp";
import { SelectionBoxObject, SelectionBoxSingle } from "../utils/SelectionBox";
import { TextInput, TextAreaInput } from "../utils/InputTypes";

const Secciones = [{ id: 1, name: "Seccion 1" }, { id: 2, name: "Seccion 2" }, { id: 3, name: "Seccion 3" }]
const Tipos = [{ id: 1, name: "Tipo 1" }, { id: 2, name: "Tipo 2" }, { id: 3, name: "Tipo 3" }]
const Grupos = [{ id: 1, name: "Grupo 1" }, { id: 2, name: "Grupo 2" }, { id: 3, name: "Grupo 3" }]

export const PostPopUp = ({ activePopUp, mode }) => {
    return (
        <PopUpForm Header={mode === "edit" ? "Editar publicación" : "Crear publicación"} activate={activePopUp}>
            <div className="row mb-4">
                <SelectionBoxObject headName={"Sección"} list={Secciones} placeholder={"Sección"}></SelectionBoxObject>
                <SelectionBoxObject headName={"Tipo"} list={Tipos} placeholder={"Tipo de publicación"}></SelectionBoxObject>
            </div>
            <div className="row mb-4">
                <SelectionBoxObject headName={"Grupo"} list={Grupos} placeholder={"Grupo"}></SelectionBoxObject>
                <SelectionBoxSingle headName={"Estado"} list={["Activo", "Inactivo"]} placeholder={"Estado"}></SelectionBoxSingle>
            </div>
            <div className="row mb-4">
                <TextInput headName={"Título de la publicación"} placeholder={"Título"} ></TextInput>
            </div>
            <div className="row mb-4">
                <TextAreaInput headName={"Contenido"} placeholder="Contenido de la publicación" width={"35vw"} height={"15vh"} />
            </div>
        </PopUpForm>
    )
}