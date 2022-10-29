import ClassRoom from '../resources/ClassRoom.jpg';
import { NewsList } from '../Lists/News';
import { New } from '../components/New';

const ListOfNews = (<NewsList news={[
    {
        NewTitle: "Noticia Normal 1",
        NewDesc: "Descripción no tan imporante 1",
        NewImage: `${ClassRoom}`,
        ImageAlt: "Alt de noticia no tan importante"
    },
    {
        NewTitle: "Noticia Normal 2",
        NewDesc: "Descripción no tan imporante 2",
        NewImage: `${ClassRoom}`,
        ImageAlt: "Alt de noticia no tan importante"
    },
    {
        NewTitle: "Noticia Normal 3",
        NewDesc: "Descripción no tan imporante 3",
        NewImage: `${ClassRoom}`,
        ImageAlt: "Alt de noticia no tan importante"
    },
    {
        NewTitle: "Noticia Normal 4",
        NewDesc: "Descripción no tan imporante 4",
        NewImage: `${ClassRoom}`,
        ImageAlt: "Alt de noticia no tan importante"
    }
]} />)

export const LatestNews = () => {
    return (
        <div className='LastNews'>
            <span>Ultimos avisos</span>
            <div className='NewsHolder'>
                <div className='ImportantNews col-6'>
                    <New info={{ NewTitle: "Noticia Importante", NewDesc: "Descipción de noticia importante", NewImage: `${ClassRoom}`, ImageAlt: "Notica importante" }} />
                </div>
                <div className='LowerNews col-6'>
                    {ListOfNews}
                </div>
            </div>
        </div>
    )
}