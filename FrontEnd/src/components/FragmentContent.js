import React from "react";

export const FragmentContent = ({ id, activeTab, children }) => {
    return (
        activeTab === id ? <div className="ContentFragment">
            {children}
        </div>
            : null
    )
}