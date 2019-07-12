import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import { useModel } from 'lib/hooks';
import { PostCollection } from 'lib/collections';
import { Post } from 'lib/models';

export const PostsTable = props => {
    let posts;
    const { postCollection } = useModel('PostCollection', new PostCollection({}).fill(Post));

    if(postCollection) {
        posts = postCollection.posts.map((post) => {
            const link = '/post/' + post.id;
            return (
                <li key={post.id}><Link to={link} user={props.user}>{post.get('title')}</Link></li>
            );
        });
    }

    return (
        <Fragment>
            {posts}            
        </Fragment>
    );
};