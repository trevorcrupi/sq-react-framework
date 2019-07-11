import React, { Fragment } from 'react';

import { Post } from 'lib/models';
import { useForm } from 'lib/hooks';

export const EditPostForm = props => {
    const onSubmit = (inputs) => {
        props.addPost(new Post({
            id: props.post.id,
            author: props.user.id,
            title: inputs.title,
            date: inputs.date,
            text: inputs.text
        }));
        props.navigate('/post/' + props.post.id);
    }

    const onDelete = () => {
        props.deletePost();
        props.navigate('/');
    }

    const { inputs, handleInputChange, handleSubmit } = useForm({ title: '', date: '', text: '' }, onSubmit);

    if(!inputs.title) {
        inputs.title = props.post.title;
    }

    if(!inputs.date) {
        inputs.date = props.post.date;
    }

    if(!inputs.text) {
        inputs.text = props.post.text;
    }


    return (
        <Fragment>
            <h3>Edit Post</h3>
            <button onClick={() => onDelete()}>Danger Zone: Delete Post</button><br /><br />
            <form onSubmit={handleSubmit}>
                Title  <br/><input name='title' type='text' value={inputs.title} onChange={handleInputChange} /><br /><br />
                Date   <br/><input name='date' type='text' value={inputs.date} onChange={handleInputChange} /><br /><br />
                Text <textarea name='text' value={inputs.text} onChange={handleInputChange} /><br /><br /><br />
                <button>Update Post</button>
            </form>
        </Fragment>
    );
}
