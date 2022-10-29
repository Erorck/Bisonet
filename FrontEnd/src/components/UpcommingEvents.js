import Orchestra from '../resources/Orchestra.jpg';
import { EventsList } from '../Lists/Events';
import { Event } from './Event';

const ListOfEvents = (<EventsList Events={[
    {
        EventTitle: 'Orquesta Sinfónica',
        EventDate: '20 Sep',
        EventImage: `${Orchestra}`,
        ImageAlt: 'Orquesta'
    },
    {
        EventTitle: 'Orquesta Sinfónica',
        EventDate: '20 Sep',
        EventImage: `${Orchestra}`,
        ImageAlt: 'Orquesta'
    },
    {
        EventTitle: 'Orquesta Sinfónica',
        EventDate: '20 Sep',
        EventImage: `${Orchestra}`,
        ImageAlt: 'Orquesta'
    },
    {
        EventTitle: 'Orquesta Sinfónica',
        EventDate: '20 Sep',
        EventImage: `${Orchestra}`,
        ImageAlt: 'Orquesta'
    }
]} />)

export const UpcommingEvents = () => {
    return (
        <div className='UpcommingEvents'>
            <span>Próximos eventos</span>
            <div className='EventsHolder'>
                {ListOfEvents}
            </div>
        </div>
    );
}