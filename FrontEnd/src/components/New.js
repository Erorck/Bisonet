import React from 'react';
import { Link } from 'react-router-dom';

export class New extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isDescVisible: true,
            params: props.info,
        }
    }

    toggleDesc = () => {
        this.setState(prevState => ({ isDescVisible: !prevState.isDescVisible }));
    };

    render() {
        return (
            <Link to={'/noticia'} style={{ textDecoration: 'none', color: 'white' }}>
                <div className={`NewCard ${this.state.isDescVisible ? "" : "CardDescription"}`} onMouseEnter={this.toggleDesc} onMouseLeave={this.toggleDesc}>

                    <div className='CardText'>
                        <span>{this.state.params.NewTitle}</span>
                        <div className='CardInfo'>
                            <span>{this.state.params.NewDesc}</span>
                        </div>
                    </div>
                    <img src={this.state.params.NewImage} alt={this.state.params.ImageAlt}></img>

                </div>
            </Link>
        )
    }
}