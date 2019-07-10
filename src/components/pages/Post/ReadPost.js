import React, { Fragment } from 'react';
import { useModel } from 'lib/hooks';
import { Post } from 'lib/models';

export const ReadPost = props => {
    const query = {
        table: 'posts',
        query: {
            id: props.id
        }
    }
    const { post } = useModel('Post', new Post({}).read(query))

    return (
        <Fragment>
            <h1>{post.title}</h1>
            <h3>{post.author}</h3>
            <p>{post.text}</p>
        </Fragment>
    );
}