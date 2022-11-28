import React, { useCallback, useEffect } from "react";
import AdminMenu from "../components/AdminMenu";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import { PostList } from "../Lists/PostList";
import { PostPopUp } from "../PopUps/PopUpPosts";
import { useState } from "react";
import Orchestra from "../resources/Orchestra.jpg";
import Studenst from "../resources/StudenstMainPhoto.jpg";
import "../css/adminPost.css";
import Cookies from "universal-cookie";
import axios from "axios";
import api from "../api.json";
import { Navigate } from "react-router-dom";

const ListOfPost = (
  <PostList
    Posts={[
      {
        Date: "28/10/2022",
        Image: `${Orchestra}`,
        Title: "Orquesta sinfónica",
        Description: "La orquesta sinfónia de la UANL hará su presentación",
      },
      {
        Date: "28/10/2022",
        Image: `${Studenst}`,
        Title: "Vuelta a clases",
        Description: "Primer día de escuela después de pandemia",
      },
    ]}
  />
);

const CenteredButton = styled.button`
  position: absolute;
  right: 50%;
  transform: translateX(50%);
  margin-top: 10px;
`;

export const PostsPage = () => {
  const [auth, IsAuthorized] = useState(false);
  const [validated, HasBeenValidated] = useState(false);
  const [Active, activePopUp] = useState(false);
  const [post, setPost] = useState({});

  const HandleActive = () => {
    activePopUp(true);
  };

  const HandlePost = (post) => {
    setPost(post);
  };

  const ValidateSession = useCallback(() => {
    HasBeenValidated(true);
  }, []);

  const url = api.link;

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    getPost();
  }, [ValidateSession]);

  async function onLoad() {
    const cookies = new Cookies();

    const config = {
      headers: { Authorization: `Bearer ${cookies.get("userToken")}` },
    };

    await axios
      .get(url + "users/" + cookies.get("userId"), config)
      .then((response) => {
        IsAuthorized(true);
      })
      .catch((error) => {
        console.log(error.response);
      });

    HasBeenValidated(true);
  }

  async function getPost() {
    const cookies = new Cookies();

    const config = {
      headers: { Authorization: `Bearer ${cookies.get("userToken")}` },
    };

    await axios
      .get(url + "post/get", config)
      .then((response) => {
        // var PostFinal = [];
        // for (let i = 0; i < response.data.data.length; i++) {
        //   if (response.data.data[i].isActive) {
        //     PostFinal.push(response.data.data[i]);
        //   }
        // }

        console.log(response.data.data);
        HandlePost(response.data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  if (!validated) {
    return null;
  }

  return (
    <div className="MainPage">
      {auth ? (
        <div>
          <AdminMenu />
          <div className="BodyContent">
            {Active ? (
              <PostPopUp
                activePopUp={activePopUp}
                prevInfo={{
                  Autor: "",
                  Seccion: "",
                  Type: "",
                  Group: "",
                  Title: "",
                  Content: "",
                }}
              ></PostPopUp>
            ) : null}
            <div className="BodyHeader">
              <span>Publicaciones</span>
            </div>
            <div className="container">
              <div className="postList col-md-12 col-lg-12">
                {post.length ? <PostList Posts={post} /> : null}
              </div>
              <CenteredButton
                className="btn btn-outline-light"
                onClick={HandleActive}
              >
                Crear publicación
              </CenteredButton>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Navigate to={"/login"} replace={true} />
      )}
    </div>
  );
};
