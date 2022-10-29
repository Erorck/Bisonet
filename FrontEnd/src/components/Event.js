import React from 'react';
import { Link } from 'react-router-dom';

export class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            EventTitle: props.EventTitle,
            EventDate: props.EventDate,
            EventImage: props.EventImage,
            ImageAlt: props.Alt
        }
    }

    render() {
        return (
            <Link to={'/noticia'} style={{ textDecoration: 'none', color: 'white' }}>
                <div className='EventCard'>
                    <img src={this.state.EventImage} alt={this.state.ImageAlt} />
                    <div className='EventText'>
                        <span>{this.state.EventTitle}</span>
                    </div>
                    <div className='EventDate'>
                        <span>{this.state.EventDate}</span>
                    </div>
                </div>
            </Link>
        )
    }
}