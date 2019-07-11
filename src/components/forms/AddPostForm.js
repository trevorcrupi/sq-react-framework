import React, { Fragment } from 'react';

import { Post } from 'lib/models';
import { useForm } from 'lib/hooks';

export const AddPostForm = props => {
    const onSubmit = (inputs) => {
        props.addPost(new Post({
            author: props.user,
            title: inputs.title,
            date: inputs.date,
            text: inputs.text
        }));
        props.navigate('/');
    }

    const { inputs, handleInputChange, handleSubmit } = useForm(props.defaults, onSubmit);

    return (
        <Fragment>
            <h3>Add a Post</h3>
            <form onSubmit={handleSubmit}>
                Title  <br/><input name='title' type='text' value={inputs.title} onChange={handleInputChange} /><br /><br />
                Date   <br/><input name='date' type='text' value={inputs.date} onChange={handleInputChange} /><br /><br />
                Text <textarea name='text' value={inputs.text} onChange={handleInputChange} /><br /><br /><br />
                <button>Create Post</button>
            </form>
        </Fragment>
    );
}
