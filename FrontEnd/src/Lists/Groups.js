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
                <GroupCard key={i} Cycle={x.semester} Name={x.course} Group={x.year} Teacher={x.group_teacher} activePopUp={this.state.Changer} id={x._id} />
            ))
        )
    }
}