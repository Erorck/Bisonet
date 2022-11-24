import React from "react";
import styled from "styled-components";

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

export const PopUpForm = ({ children, Header, activate }) => {

    const HandleActive = () => {
        activate(false)
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
                        <PopUpBottom type="button" className="btn btn-outline-light">Crear</PopUpBottom>
                        <PopUpBottom action={HandleActive} type="button" className="btn btn-outline-info">Cancelar</PopUpBottom>
                    </div>
                </div>
            </PopUpContent>
        </PopUpBackGround>
    )
}