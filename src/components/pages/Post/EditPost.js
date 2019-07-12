import React, { memo, useContext } from 'react';
import { EditPostForm } from 'components/forms';
import { Model } from 'lib/framework/context';
import { useModel } from 'lib/hooks';
import { Post } from 'lib/models';

export const EditPost = memo(props => {
    const dispatch = useContext(Model);
    // Read Query
    const query = {
        table: 'posts',
        query: {
            id: props.id
        }
    }
    const { post } = useModel('Post', new Post({}).read(query));

    const addPost = post => {
        if(post.id) {
            // Update Query
            const query = {
                table: 'posts',
                query: {
                    id: post.id
                },
                update: { 
                    title: post.title,
                    date: post.date,
                    text: post.text,
                }
            }
            dispatch(post.update(query));
        }
    }

    const deletePost = () => {
        // Delete Query
        const query = {
            table: 'posts',
            delete: {
                id: post.id
            }
        }
        dispatch(post.delete(query));
    };

    return (
        <EditPostForm user={props.user} addPost={addPost} deletePost={deletePost} post={post} navigate={props.navigate} />
    );
});
