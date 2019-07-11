import React, { Fragment } from 'react';
import { useModel } from 'lib/hooks';
import { Post } from 'lib/models';
import { Link } from '@reach/router';

export const ReadPost = props => {
    let editLink;
    const query = {
        table: 'posts',
        query: {
            id: props.id
        }
    }

    const { post } = useModel('Post', new Post({}).read(query));

    if(post.author === props.user.id) {
        const link = '/post/edit/' + post.id;
        editLink = (
            <Link to={link} post={post} >Edit Post</Link>
        );
    }  else {
        editLink = <Fragment></Fragment>;
    }

    return (
        <Fragment>
            {editLink}
            <h1>{post.get('title')}</h1>
            <h3>{post.get('author')}</h3>
            <p>{post.get('text')}</p>
        </Fragment>
    );
}