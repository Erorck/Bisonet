import React, { useState } from "react";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsFillChatFill } from "react-icons/bs";
import styled from 'styled-components'
import ProfilePic from '../resources/perfil1.jpg';
import { TextAreaInput } from '../utils/InputTypes';

const OptionsHolder = styled.div`
.optionsComponent {
    cursor:pointer;
}
`

export const Thread = ({ Body, Date, Owner, Image }) => {

    const [Show, showCommentArea] = useState(false)

    const HandleClick = () => {
        showCommentArea(true)
    }

    return (
        <div className="ThreadCard">
            <div className="ThreadHead">
                <div className="UpperInfo">
                    <div className="ProfesorInfo">
                        <div className="PhotoHolder">
                            <img className="ProfilePhoto" src={Image} alt='Foto de perfil' />
                        </div>
                        <span>{Owner}</span>
                    </div>
                    <span className="ThreadDate">{Date}</span>
                </div>
                <div className="LoweInfo">
                    <div className="Message">
                        {Body}
                    </div>
                </div>
                <OptionsHolder className="DisplayerHolder">
                    <BsFillChatFill className="optionsComponent" onClick={HandleClick} />
                    <BsHandThumbsUp className="optionsComponent" />
                </OptionsHolder>
                {Show ? <div className="d-flex flex-start w-100">
                    <img
                        className="rounded-circle shadow-1-strong me-3"
                        src={ProfilePic}
                        alt="avatar"
                        width="40"
                        height="40"
                    />
                    <div className="form-outline w-100">
                        <TextAreaInput placeholder={"Comentario"} height={"10vh"} />
                    </div>
                </div> : null}
            </div>
        </div>
    )
}