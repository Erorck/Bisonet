import React, { Component } from 'react';
import { New } from '../components/New';
import { Col, Container, Row } from 'reactstrap';
import { Routes } from 'react-router-dom';

export class NewsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            news: props.news
        };
    }

    render() {
        var news = this.state.news || [];
        return (
            news.map((x, i) => (
                <New key={i} info={{ NewTitle: x.NewTitle, NewDesc: x.NewDesc, NewImage: `${x.NewImage}`, ImageAlt: x.ImageAlt }} />
            ))
        )
    }
}