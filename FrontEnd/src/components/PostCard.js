import React from "react";

export const PostCard = ({ PublishDate, Image, Title, Description }) => {
    return (
        <div className="post vt-post">
            <div className="row">
                <div className="col-xs-12 col-sm-5 col-md-5 col-lg-4">
                    <div className="post-type post-img">
                        <a href="#"><img src={Image} className="img-responsive" alt="image post" /></a>
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
                        <button type="button" className="btn btn-outline-success">Aceptar</button>
                        <button type="button" className="btn btn-outline-danger">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}