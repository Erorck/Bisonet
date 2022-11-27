import React, {useEffect, useState} from "react";
import { PopUpForm } from "../utils/PopUp";
import { SearchObjectSelection, SelectionBoxObject, SelectionBoxSingle } from "../utils/SelectionBox";
import { YearsList } from "../types/Dates";
import Cookies from "universal-cookie";
import axios from "axios";
import api from "../api.json"

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

export const GroupsPopUp = ({ prevInfo, setActive, mode, id }) => {

    //Users
    const [Userss, setUsers] = useState([]);
    const [Maestross, seMaestross] = useState([]);
    const cookies = new Cookies();
    const Alumnos = [];
    const Maestros = [];
    const url = api.link;
    const [objectID, setId] = useState(id);

    useEffect(() => {
         fetch('http://serene-waters-87032.herokuapp.com/api/v1/users', {
            method: 'GET',
            /*body: JSON.stringify({
            title:,
            }),*/
            headers: new Headers({
                'Authorization': 'Bearer '+cookies.get("userToken"), 
            }),
            })
            .then((response) => response.json())
            .then((data) => {
                for (let i = 0; i < data.data.length; i++) {
                    var Estudiante = {name: data.data[i].first_name + " " + data.data[i].first_last_name, id:data.data[i]._id};
                    for (let j = 0; j < data.data[i].user_type.length; j++) {
                        if(data.data[i].user_type[j] == "Alumno")
                        {
                            Alumnos.push(Estudiante);
                        }
                        if (data.data[i].user_type[j] == "Maestro")
                        {
                            Maestros.push(Estudiante);
                        }
                    }
                    
                }
                setUsers(Alumnos);
                seMaestross(Maestros);
            })
     },[]);

     //Cursos
     const [Cursoss, SetCursos] = useState([]);
     const Materias = [];
     useEffect(() => {
        fetch('http://serene-waters-87032.herokuapp.com/api/v1/courses', {
           method: 'GET',
           /*body: JSON.stringify({
           title:,
           }),*/
           headers: new Headers({
               'Authorization': 'Bearer '+cookies.get("userToken"), 
           }),
           })
           .then((response) => response.json())
           .then((data) => {
               for (let i = 0; i < data.data.length; i++) {
                var Materia = {name: data.data[i].course_name, id: data.data[i]._id};
                Materias.push(Materia);
               }
               SetCursos(Materias);
           })
    },[]);

    const [form, setFormInfo] = useState(prevInfo);

    const CreateNewGroup = event =>
    {
        setFormInfo({
            ...form,
            [event.target.name]: event.target.value
        });

       /* const GrupoDatos = {
            group_teacher: InputMaestro,
            group_members: InputAlumno,
            course: InputCursos,
            year: InputAño,
            semester: InputSemestre,
        }; */
    }

    const CreateArrayMembers = nombre =>
    {
        const {group_members} = form;
        group_members.push(nombre);
        setFormInfo({
            ...form,
            group_members: group_members
        });
    }

    const CreateGroup = async () =>
    {
        form.semester = parseInt(form.semester);

        const config = {
            headers: { 'Authorization': `Bearer ${cookies.get("userToken")}` }
        }

        await axios.post(url + 'groups/', form, config).then(response => {

            console.log(response.data)

        }).catch(error => {

            console.log(error.response.data)

        })
    }
    
    const UpdateGroup = async () =>
    {
        const config = {
            headers: { 'Authorization': `Bearer ${cookies.get("userToken")}` }
        }

        const {semester,year, ...data} = form

        await axios.patch(url + 'groups/'+objectID, data, config).then(response => {

            console.log(response.data)

        }).catch(error => {

            console.log(error.response.data)

        })
        console.log(data);
        console.log(objectID);
    }


    useEffect(() => {
        console.log(form)
    }, [form])


    return (
        <PopUpForm Header={mode === "edit" ? "Editar grupo" : "Alta de grupo"} activate={setActive} action={mode === "edit" ? UpdateGroup : CreateGroup} acceptButton={mode === "edit" ? "Editar " : "Crear"}>
            <div className="row mb-4">
                <SelectionBoxObject name={"group_teacher"} headName="Maestro" placeholder="seleciona Maestro" list={Maestross} prevValue={prevInfo ? form.group_teacher : null } Handler={CreateNewGroup}/>
                <SelectionBoxObject name={"course"} headName="Curso" placeholder="seleciona Curso" list={Cursoss} prevValue={prevInfo ? form.course : null} Handler={CreateNewGroup}/>
                <SelectionBoxObject name={"semester"} headName="Semestre" placeholder="seleciona Semestre" list={Semestres} prevValue={prevInfo ? form.semester : null} Handler={CreateNewGroup}/>
            </div>
            <div className="row mb-4">
                <SelectionBoxSingle name={"year"} headName="Año" placeholder="seleciona Año" list={YearsList(10)} prevValue={prevInfo ? form.year : null} Handler={CreateNewGroup}/>
            </div>
            <div className="row mb-4">
                <SearchObjectSelection name={"group_members"} headName="Seleccionar Alumnos" list={Userss} prevValue={prevInfo ? form.group_members : null} onclickHandler={CreateArrayMembers}/>
            </div>
            
        </PopUpForm>
    )
}