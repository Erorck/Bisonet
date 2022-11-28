import React from "react";
import { PostCard } from "../components/PostCard";
import api from "../api.json";

export class PostList extends React.Component {
  constructor(props) {
    super(props);
    let url = String(api.link_storage);

    this.state = {
      Posts: props.Posts,
      url: String(api.link_storage),
    };
  }

  render() {
    var post = this.state.Posts || [];
    return post.map((x, i) => (
      <PostCard
        key={i}
        id={x._id}
        PublishDate={new Date(x.Fecha_Publicacion).toLocaleString()}
        Image={this.state.url.concat(x.Banner_Image.file_name)}
        Title={x.Title}
        Description={x.Content}
        InnerContent={x}
      />
    ));
  }
}
