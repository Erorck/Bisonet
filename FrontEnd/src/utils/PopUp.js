import React, { forwardRef, useImperativeHandle, useState } from "react";
import styled, { keyframes } from "styled-components";

const PopUpContent = styled.div`
display: flex;
position: relative;
justify-content: center;
align-items: center;
border-radius: 12px;
background-color: #212529;
max-height: 85vh;
max-width: 85vh;
padding: 5vh 5vw;
`;

const PopUpBackGround = styled.div`
    top: 0px;
    left: 0px;
    position: fixed;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .5);
`;

const PopUpHeader = styled.div`
    color: white;
    font-size: 50px;
    margin-top: 0;
    margin-bottom: 1rem;
`
const PopUpButton = ({ children, className, action }) => (
    <button onClick={action} className={className}>{children}</button>
);

const PopUpBottom = styled(PopUpButton)`
    padding: 10px;
    margin: 10px;
`;

const AlertAnimation = keyframes`
    0%{
        transform: translateY(150%)
    }

    50% {
        transform: translateY(0%)
    }

    100% {
        transform: translateY(150%)
    }
`

const AlertMessage = styled.div`
    background-color: ${props => props.messageColor};
    padding: 1em;
    border-radius: 12px;
    color: white;
    position: fixed;
    z-index: 99;
    transform: translateY(calc(150% + 2vh));
    left: 2vw;
    bottom: 2vh;
    animation-name:${AlertAnimation};
    animation-timing-function: ease;
    animation-duration: 5s;
`

export const PopUpForm = ({ children, Header, activate, action, acceptButton }) => {

    const HandleActive = () => {
        activate(false)
    }

    const HandleAction = () => {
        action()
    }

    return (
        <PopUpBackGround>
            <PopUpContent>
                <div className="alta">
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        <PopUpHeader>{Header}</PopUpHeader>
                    </div>
                    <div className="divider d-flex align-items-center my-4">
                    </div>
                    {children}
                    <div>
                        <PopUpBottom type="button" className="btn btn-outline-light" action={HandleAction}>{acceptButton}</PopUpBottom>
                        <PopUpBottom action={HandleActive} type="button" className="btn btn-outline-info">Cancelar</PopUpBottom>
                    </div>
                </div>
            </PopUpContent>
        </PopUpBackGround>
    )
}

export const PopUpMessage = forwardRef((props, ref) => {

    const [popUp, setActive] = useState(false)

    useImperativeHandle(ref, () => ({

        activeAnimation(color, info) {
            setActive({ draw: true, status: color, message: info })
        }

    }))

    const stopAnimation = () => {
        setActive(false)
    }

    return (
        <div>
            {popUp.draw ? <AlertMessage messageColor={popUp.status} onAnimationEnd={stopAnimation}>
                {popUp.message}
            </AlertMessage> : null}
        </div>
    )

})