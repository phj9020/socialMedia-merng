import React from 'react';
import { useLocation } from 'react-router-dom';

function Post() {
    let location = useLocation();
    console.log(location.pathname.split('/'));
    // get post using post id 
    return (
        <div>
            <h1>post</h1>
        </div>
    )
}

export default Post
