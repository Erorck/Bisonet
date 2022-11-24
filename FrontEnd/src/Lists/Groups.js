import React from "react";
import { GroupCard } from "../components/GroupsCard";

export class GroupsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Changer: props.Changer,
            Groups: props.Groups
        }
    }

    render() {
        var groups = this.state.Groups;
        return (
            groups.map((x, i) => (
                <GroupCard key={i} Cycle={x.Cycle} Name={x.Name} Group={x.Group} Teacher={x.Teacher} activePopUp={this.state.Changer} />
            ))
        )
    }
}