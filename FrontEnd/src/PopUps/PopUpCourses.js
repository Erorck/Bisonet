import React, { useEffect, useRef, useState } from "react";
import { PopUpForm, PopUpMessage } from "../utils/PopUp";
import { SelectionBoxSingle } from "../utils/SelectionBox";
import { TextInput } from "../utils/InputTypes";
import axios from "axios";
import api from "../api.json"
import Cookies from "universal-cookie";

const Semestres = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const Especialidades = ['Programación', '3D', '2D', 'Video', 'Arte', 'Tronco común']

export const CoursesPopUp = ({ activePopUp, mode, prevInfo, id }) => {

    const [form, setFormInfo] = useState(prevInfo)
    const [objectID, setId] = useState(id)

    const url = api.link
    const childRef = useRef()

    const HandleChange = event => {
        setFormInfo({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const SendUpdateRequest = async () => {
        const cookies = new Cookies();

        const config = {
            headers: { 'Authorization': `Bearer ${cookies.get("userToken")}` }
        }

        await axios.patch(url + 'courses/' + objectID, form, config).then(response => {

            childRef.current.activeAnimation("green", response.data.message)

        }).catch(error => {

            childRef.current.activeAnimation("red", error.response)

        })
    }

    const SendCreateRequest = async () => {
        const cookies = new Cookies();

        const config = {
            headers: { 'Authorization': `Bearer ${cookies.get("userToken")}` }
        }

        await axios.patch(url + 'courses/' + objectID, form, config).then(response => {

            childRef.current.activeAnimation("green", response.data.message)

        }).catch(error => {

            childRef.current.activeAnimation("red", error.response)

        })
    }

    useEffect(() => {
        console.log(form)
    }, [form])

    return (
        <PopUpForm Header={mode === "edit" ? "Editar materia" : "Alta materia"} activate={activePopUp} action={mode === "edit" ? SendUpdateRequest : SendCreateRequest} acceptButton={mode === "edit" ? "Editar " : "Crear"}>
            <div className="row mb-4">
                <TextInput name={"course_name"} headName={"Nombre de materia"} placeholder={"Nombre de la materia"} prevValue={prevInfo ? form.course_name : null} Handler={HandleChange}></TextInput>
            </div>
            <div className="row mb-4">
                <SelectionBoxSingle name={"semester"} headName={"Semestre"} placeholder={"Selecciona semestre"} list={Semestres} prevValue={prevInfo ? form.semester : null} Handler={HandleChange}></SelectionBoxSingle>
                <SelectionBoxSingle name={"career_especialty"} headName={"Especialidad"} placeholder={"Selecciona especialidad"} list={Especialidades} prevValue={prevInfo ? form.career_especialty : null} Handler={HandleChange}></SelectionBoxSingle>
            </div>
            <PopUpMessage Message={mode === "edit" ? "Se ha editado la materia correctamente" : "Se ha creado la materia correctamente"} ref={childRef} />
        </PopUpForm>
    )
}
