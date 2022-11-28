import React, { useState } from "react";
import styled from "styled-components";
import { PostPopUp } from "../PopUps/PopUpPosts";
import Cookies from "universal-cookie";
import axios from "axios";
import api from "../api.json";

const PostCardButton = styled.button`
  margin: 0 10px;
`;

export const PostCard = ({
  id,
  PublishDate,
  Image,
  Title,
  Description,
  InnerContent,
}) => {
  const [Active, activePopUp] = useState(false);

  const HandleActive = () => {
    activePopUp(true);
  };

  const DeletePost = async () => {
    const url = api.link;
    const cookies = new Cookies();
    const config = {
      headers: { Authorization: `Bearer ${cookies.get("userToken")}` },
    };

    const data = { isActive: false };

    await axios
      .patch(url + "/post/update/" + id, data, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="post vt-post">
      {Active ? (
        <PostPopUp
          activePopUp={activePopUp}
          mode={"edit"}
          prevInfo={{
            Autor: InnerContent.Autor,
            id: id,
            Seccion: InnerContent.Seccion,
            Type: InnerContent.Type,
            Group: InnerContent.Group,
            Title: InnerContent.Title,
            Content: InnerContent.Content,
          }}
        ></PostPopUp>
      ) : null}
      <div className="row">
        <div className="col-xs-12 col-sm-5 col-md-5 col-lg-4">
          <div className="post-type post-img">
            <img src={Image} className="img-responsive" alt="post" />
          </div>
          <div className="author-info author-info-2">
            <ul className="list-inline">
              <li>
                <div className="info">
                  <p>Publicado el: {PublishDate}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-8">
          <div className="caption">
            <h3>{Title}</h3>
            <p> {Description} </p>
            <PostCardButton type="button" className="btn btn-outline-success">
              Aceptar
            </PostCardButton>
            <PostCardButton
              onClick={HandleActive}
              type="button"
              className="btn btn-outline-info"
            >
              Editar
            </PostCardButton>
            <PostCardButton
              type="button"
              onClick={DeletePost}
              className="btn btn-outline-danger"
            >
              Eliminar
            </PostCardButton>
          </div>
        </div>
      </div>
    </div>
  );
};
