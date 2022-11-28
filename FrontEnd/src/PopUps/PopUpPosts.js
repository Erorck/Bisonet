import React, { useEffect, useState } from "react";
import { PopUpForm } from "../utils/PopUp";
import { SelectionBoxObject, SelectionBoxSingle } from "../utils/SelectionBox";
import { TextInput, TextAreaInput } from "../utils/InputTypes";
import Cookies from "universal-cookie";
import axios from "axios";
import api from "../api.json";

const Secciones = [
  { id: 1, name: "Seccion 1" },
  { id: 2, name: "Seccion 2" },
  { id: 3, name: "Seccion 3" },
];
const Tipos = [
  { id: 1, name: "Tipo 1" },
  { id: 2, name: "Tipo 2" },
  { id: 3, name: "Tipo 3" },
];
const Grupos = [
  { id: 1, name: "Grupo 1" },
  { id: 2, name: "Grupo 2" },
  { id: 3, name: "Grupo 3" },
];

export const PostPopUp = ({ activePopUp, mode, prevInfo, id }) => {
  const [form, setFormInfo] = useState(prevInfo);
  const cookies = new Cookies();
  const url = api.link;
  const [objectID, setId] = useState(id);

  const HandleChange = (event) => {
    setFormInfo({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  const [SeccionesL, setSection] = useState([]);
  const Secciones = [];
  useEffect(() => {
    fetch(
      "https://warm-badlands-92671.herokuapp.com/api/v1/sections/get/section",
      {
        method: "GET",
        /*body: JSON.stringify({
          title:,
          }),*/
        headers: new Headers({
          Authorization: "Bearer " + cookies.get("userToken"),
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.data.length; i++) {
          var Seccion = { name: data.data[i].nombre, id: data.data[i]._id };
          Secciones.push(Seccion);
        }
        setSection(Secciones);
      });
  }, []);

  const [TiposPostL, SetPostType] = useState([]);
  const TiposPost = [];
  useEffect(() => {
    fetch("https://warm-badlands-92671.herokuapp.com/api/v1/tipos_post", {
      method: "GET",
      /*body: JSON.stringify({
          title:,
          }),*/
      headers: new Headers({
        Authorization: "Bearer " + cookies.get("userToken"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.data.length; i++) {
          var TipoPost = { name: data.data[i].nombre, id: data.data[i]._id };
          TiposPost.push(TipoPost);
        }
        SetPostType(TiposPost);
      });
  }, []);

  //////////
  const CreatePost = async () => {
    const config = {
      headers: { Authorization: `Bearer ${cookies.get("userToken")}` },
    };

    const userId = cookies.get("userId");

    let body = { ...form };

    // body.isActive =
    //   body.isActive === "Activo" || body.isActive === "" ? true : false;

    body.isActive = undefined;

    body.Group = undefined;

    await axios
      .post(url + "post/create/", { ...body, Autor: userId }, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  ////////
  const UpdatePost = async () => {
    const config = {
      headers: { Authorization: `Bearer ${cookies.get("userToken")}` },
    };

    await axios
      .patch(url + "/post/update/" + objectID, form, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(form);
      });
    console.log(form);
    console.log(objectID);
  };

  return (
    <PopUpForm
      Header={mode === "edit" ? "Editar publicación" : "Crear publicación"}
      activate={activePopUp}
      action={mode === "edit" ? UpdatePost : CreatePost}
      acceptButton={mode === "edit" ? "Editar " : "Crear"}
    >
      <div className="row mb-4">
        <SelectionBoxObject
          name={"Seccion"}
          headName={"Sección"}
          list={SeccionesL}
          placeholder={"Sección"}
          Handler={HandleChange}
          prevValue={prevInfo ? form.Seccion : null}
        ></SelectionBoxObject>
        <SelectionBoxObject
          name={"Type"}
          headName={"Tipo"}
          list={TiposPostL}
          placeholder={"Tipo de publicación"}
          Handler={HandleChange}
          prevValue={prevInfo ? form.Type : null}
        ></SelectionBoxObject>
      </div>
      <div className="row mb-4">
        <SelectionBoxObject
          name={"Group"}
          headName={"Grupo"}
          list={Grupos}
          placeholder={"Grupo"}
          Handler={HandleChange}
          prevValue={prevInfo ? form.Group : null}
        ></SelectionBoxObject>
        <SelectionBoxSingle
          name={"isActive"}
          headName={"Estado"}
          list={["Activo", "Inactivo"]}
          placeholder={"Estado"}
          Handler={HandleChange}
        ></SelectionBoxSingle>
      </div>
      <div className="row mb-4">
        <TextInput
          name={"Title"}
          headName={"Título de la publicación"}
          placeholder={"Título"}
          Handler={HandleChange}
          prevValue={prevInfo ? form.Title : null}
        ></TextInput>
      </div>
      <div className="row mb-4">
        <TextAreaInput
          name={"Content"}
          headName={"Contenido"}
          placeholder="Contenido de la publicación"
          width={"35vw"}
          height={"15vh"}
          Handler={HandleChange}
          prevValue={prevInfo ? form.Content : null}
        />
      </div>
    </PopUpForm>
  );
};
