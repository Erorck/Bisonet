import React from "react";
import { useState } from "react";
import styled from "styled-components";

export const SelectionBoxObject = ({ name, headName, placeholder, list, prevValue, Handler }) => {
    return (

        <div className="col">
            {Array.isArray(list) ?
                <div className="form-outline">
                    <label className="form-label">{headName}</label>
                    <br />
                    <select className="form-select" aria-label="Default select example" name={name ? name : null}  placeholder={placeholder} value={prevValue ? prevValue : undefined} onChange={Handler ? Handler : null} defaultValue="0">
                        <option value="0" disabled={true} selected="selected">{placeholder}</option>
                        {list.map(x => (
                            <option key={x.id} value={x.id}>{x.name}</option>
                        ))}
                    </select>
                </div> : null}
        </div>
    )
}

export const SelectionBoxSingle = ({ name, headName, placeholder, list, prevValue, Handler }) => {

    return (

        <div className="col">
            {Array.isArray(list) ?
                <div className="form-outline">
                    <label className="form-label">{headName}</label>
                    <br />
                    <select name={name ? name : null} className="form-select" aria-label="Default select example" value={prevValue ? prevValue : undefined} onChange={Handler ? Handler : null} defaultValue="0">
                        <option value="0" disabled={true} selected="selected">{placeholder}</option>
                        {list.map(x => (
                            <option key={x} value={x}>{x}</option>
                        ))}
                    </select>
                </div > : null
            }
        </div >
    )
}

const ListContainer = styled.ul`
    padding-left: 0;
    background-color: #0e0f0f;
    max-height: 15vh;
    margin: 1em;
    padding: 1em;
    overflow: scroll;
    border-radius: 6px;
`
const ListItem = styled.li`
    color: white;
    font-size: 15px;
    list-style: none;
    margin: 5px;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color ease .2s;
    background-color: ${props => props.hover ? "#212529" : "#0e0f0f"}
`;

const ListInput = styled.input`
    display: block;
    width: 100%;
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
`

export const SearchObjectSelection = ({ headName, list, onclickHandler}) => {

    const ListedItems = list;

    const [filter, setValue] = useState("");

    return (
        <div>
            <label className="form-label">{headName}</label>
            <br />
            <ListInput type="text" onChange={(e) => setValue(e.target.value)}></ListInput>
            <ListContainer>
                {ListedItems.filter(x =>
                    x.name.toLowerCase().includes(filter.toLowerCase())
                ).map((FilterItem) => (
                    <ObjectListItem key={FilterItem.id} name={FilterItem.name} id={FilterItem.id} onClick={onclickHandler}></ObjectListItem>
                ))}
            </ListContainer>
        </div >
    )
}

const ObjectListItem = ({ name, id, onClick }) => {
    const [hover, setHover] = useState(false)

    function HandleMouseEnter() {
        setHover(true)
    }
    function HandleMouseLeave() {
        setHover(false)
    }

    function HandleOnclick()
    {
        onClick(id);
    }

    return (
        <ListItem hover={hover} onMouseEnter={HandleMouseEnter} onMouseLeave={HandleMouseLeave} onClick={HandleOnclick}> {name} {id}</ListItem>
    )
}