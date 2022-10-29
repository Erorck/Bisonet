import React, { Component } from 'react';
import { Event } from '../components/Event';

export class EventsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: props.Events
        };
    }

    render() {
        var events = this.state.events || [];
        return (
            events.map((x, i) => (
                <Event key={i} EventTitle={x.EventTitle} EventDate={x.EventDate} EventImage={x.EventImage} Alt={x.ImageAlt} />
            ))
        )
    }
}