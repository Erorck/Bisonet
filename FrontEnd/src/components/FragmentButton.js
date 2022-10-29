import React from "react";

export const FragmentButton = ({ Title, id, activeTab, setActiveTab }) => {

    const HandleClick = () => {
        setActiveTab(id);
    };

    return (
        <div className={`FragmentButton ${activeTab === id ? 'ActiveFragment' : ""}`} >
            <button onClick={HandleClick}>{Title}</button>
        </div >
    )

}