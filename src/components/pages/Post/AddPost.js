import React, { memo, } from 'react';
import { useModel } from 'lib/hooks';

import { AddPostForm } from 'components/forms';
import { User } from 'lib/models';

export const AddPost = memo(props => {
    const { user, dispatch } = useModel('User', new User({}).read({ table: 'user' }));

    const addPost = post => {
        if(post.id) {
            dispatch(post.create());
        }
    }

    return (
        <AddPostForm user={user} addPost={addPost} />
    );
});
