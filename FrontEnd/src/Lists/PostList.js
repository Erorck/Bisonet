import React from "react";
import { PostCard } from "../components/PostCard";

export class PostList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Posts: props.Posts
        }
    }

    render() {
        var post = this.state.Posts || [];
        return (
            post.map((x, i) => (
                <PostCard key={i} PublishDate={x.Date} Image={x.Image} Title={x.Title} Description={x.Description} />
            ))
        )
    }
}