import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
    .styledInput {
        display: block;
        width: ${props => props.width ? props.width : "100%"};
        min-width: 100%;
        min-height: ${props => props.height ? props.height : "auto"};
        padding: 0.375rem 2.25rem 0.375rem 0.75rem;
        -moz-padding-start: calc(0.75rem - 3px);
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        background-color: #fff;
        border: 1px solid #ced4da;
        border-radius: 0.375rem;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        appearance: none;
    }
`

export const TextInput = ({ headName, placeholder, width, name, Handler, type, prevValue }) => {
    return (
        <InputContainer width={width} className="col">
            <label className="form-label">{headName}</label>
            <br />
            <input className="styledInput" type={type ? type : "text"} value={prevValue ? prevValue : ""} placeholder={placeholder} autoComplete="false" onChange={Handler ? Handler : null} name={name ? name : ""} />
        </InputContainer>
    )
}

export const TextAreaInput = ({ headName, placeholder, width, height, prevValue }) => {
    return (
        <InputContainer className="col" width={width} height={height}>
            {headName ? <div><label className="form-label">{headName}</label><br /></div> : null}
            <textarea value={prevValue ? prevValue : ""} className="styledInput" type="text" placeholder={placeholder} autoComplete="false" />
        </InputContainer>
    )
}