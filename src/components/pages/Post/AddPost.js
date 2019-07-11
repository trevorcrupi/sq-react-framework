import React, { memo, useContext } from 'react';
import { AddPostForm } from 'components/forms';
import { Model } from 'lib/framework/context';

export const AddPost = memo(props => {
    const dispatch = useContext(Model);

    const addPost = post => {
        if(post.id) {
            dispatch(post.create());
        }
    }

    return (
        <AddPostForm user={props.user} addPost={addPost} defaults={{ title: '', date: '', text: ''}} navigate={props.navigate} />
    );
});
