import React from "react";
import { ProfileInfo } from "../components/ProfileInfo";
import { ProfileEdit } from "../Tabs/ProfileEditing";
import UpperMenu from "../components/Menu";
import { useState } from "react";
import { FragmentContent } from "../components/FragmentContent";
import { Footer } from "../components/Footer";

export const ProfilePage = () => {

    const [ActiveTab, setActive] = useState('View')

    return (
        <div className="MainPage">
            <UpperMenu />
            <div className="BodyContent">
                <FragmentContent id={'View'} activeTab={ActiveTab}>
                    <ProfileInfo setActive={setActive} />
                </FragmentContent>
                <FragmentContent id={'Edit'} activeTab={ActiveTab}>
                    <ProfileEdit setActive={setActive} />
                </FragmentContent>
            </div>
            <Footer />
        </div>
    )
}