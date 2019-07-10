import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import { useModel } from 'lib/hooks';
import { Post } from 'lib/models';

export const PostsTable = props => {
    let posts;
    const { postCollection } = useModel('PostCollection', new Post({}).getAllPosts());

    if(postCollection) {
        posts = postCollection.map((post) => {
            const link = '/post/' + post.id;
            return (
                <li><Link to={link}>{post.title}</Link></li>
            );
        });
    }

    return (
        <Fragment>
            {posts}            
        </Fragment>
    );
};