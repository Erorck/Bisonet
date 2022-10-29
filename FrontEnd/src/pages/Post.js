import React from "react";
import AdminMenu from "../components/AdminMenu";
import { Footer } from "../components/Footer";
import { PostList } from "../Lists/PostList";
import Orchestra from "../resources/Orchestra.jpg"
import Studenst from "../resources/StudenstMainPhoto.jpg"
import '../css/adminPost.css'

const ListOfPost = (<PostList Posts={[
    {
        Date: '28/10/2022',
        Image: `${Orchestra}`,
        Title: 'Orquesta sinfónica',
        Description: 'La orquesta sinfónia de la UANL hará su presentación'
    },
    {
        Date: '28/10/2022',
        Image: `${Studenst}`,
        Title: 'Vuelta a clases',
        Description: 'Primer día de escuela después de pandemia'
    }
]} />)

export const PostsPage = () => {
    return (
        <div className="MainPage">
            <AdminMenu />
            <div className="BodyContent">
                <div className="BodyHeader">
                    <span>Publicaciones</span>
                </div>
                <div className="container">
                    <div className="postList col-md-12 col-lg-12">
                        {ListOfPost}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}