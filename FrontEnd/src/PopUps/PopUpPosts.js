import React, { useEffect, useState } from "react";
import { PopUpForm } from "../utils/PopUp";
import { SelectionBoxObject, SelectionBoxSingle } from "../utils/SelectionBox";
import { TextInput, TextAreaInput } from "../utils/InputTypes";

const Secciones = [{ id: 1, name: "Seccion 1" }, { id: 2, name: "Seccion 2" }, { id: 3, name: "Seccion 3" }]
const Tipos = [{ id: 1, name: "Tipo 1" }, { id: 2, name: "Tipo 2" }, { id: 3, name: "Tipo 3" }]
const Grupos = [{ id: 1, name: "Grupo 1" }, { id: 2, name: "Grupo 2" }, { id: 3, name: "Grupo 3" }]

export const PostPopUp = ({ activePopUp, mode, prevInfo }) => {

    const [form, setFormInfo] = useState(prevInfo)

    const HandleChange = event => {
        setFormInfo({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        console.log(form)
    }, [form])

    return (
        <PopUpForm Header={mode === "edit" ? "Editar publicación" : "Crear publicación"} activate={activePopUp} acceptButton={mode === "edit" ? "Editar " : "Crear"}>
            <div className="row mb-4">
                <SelectionBoxObject name={"Seccion"} headName={"Sección"} list={Secciones} placeholder={"Sección"} Handler={HandleChange} prevValue={prevInfo ? form.Seccion : null}></SelectionBoxObject>
                <SelectionBoxObject name={"Type"} headName={"Tipo"} list={Tipos} placeholder={"Tipo de publicación"} Handler={HandleChange} prevValue={prevInfo ? form.Type : null}></SelectionBoxObject>
            </div>
            <div className="row mb-4">
                <SelectionBoxObject name={"Group"} headName={"Grupo"} list={Grupos} placeholder={"Grupo"} Handler={HandleChange} prevValue={prevInfo ? form.Group : null}></SelectionBoxObject>
                <SelectionBoxSingle headName={"Estado"} list={["Activo", "Inactivo"]} placeholder={"Estado"} Handler={HandleChange}></SelectionBoxSingle>
            </div>
            <div className="row mb-4">
                <TextInput name={"Title"} headName={"Título de la publicación"} placeholder={"Título"} Handler={HandleChange} prevValue={prevInfo ? form.Title : null}></TextInput>
            </div>
            <div className="row mb-4">
                <TextAreaInput name={"Content"} headName={"Contenido"} placeholder="Contenido de la publicación" width={"35vw"} height={"15vh"} Handler={HandleChange} prevValue={prevInfo ? form.Content : null} />
            </div>
        </PopUpForm>
    )
}