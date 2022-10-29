import React from "react";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsFillChatFill } from "react-icons/bs"

export const Thread = ({ Body, Date, Owner, Image }) => {
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
                <div className="DisplayerHolder">
                    <BsFillChatFill />
                    <BsHandThumbsUp />
                </div>
            </div>
        </div>
    )
}