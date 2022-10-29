import React from "react";
import CarouselFade from "../components/Carousell";
import UpperMenu from "../components/Menu";
import { Footer } from "../components/Footer";
import { ThreadsList } from "../Lists/Threads";
import Profile from '../resources/perfil1.jpg';
import '../css/materia.css';

const ListOfThreads = (<ThreadsList Threads={[
    {
        Body: 'La entrega del proyecto es el día 20',
        Date: '26/10/2022',
        Owner: 'Profesor 1',
        Image: `${Profile}`
    },
    {
        Body: 'Buenos dias',
        Date: '26/10/2022',
        Owner: 'Profesor 1',
        Image: `${Profile}`
    }
]} />)

export const CoursePage = () => {
    return (
        <div className='MainPage'>
            <UpperMenu />
            <div className="HeadCarousel">
                <div className='CarouselMessage'>
                    <span>Materia</span>
                </div>
                <CarouselFade />
            </div>
            <div className='BodyContent'>
                <div className='BodyHeader'>
                    <span>Materia</span>
                </div>
                <div className="ThreadsHolder">
                    {ListOfThreads}
                </div>
            </div>
            <Footer />
        </div>
    )
}