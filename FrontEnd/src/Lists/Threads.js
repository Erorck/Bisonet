import React from "react";
import { Thread } from "../components/Thread";

export class ThreadsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Threads: props.Threads
        }
    }

    render() {
        var threads = this.state.Threads;
        return (
            threads.map((x, i) => (
                <Thread key={i} Body={x.Body} Date={x.Date} Owner={x.Owner} Image={x.Image} />
            ))
        )
    }
}