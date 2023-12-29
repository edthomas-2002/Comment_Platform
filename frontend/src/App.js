// frontend/src/App.js

import React from 'react';
import Posts from './components/Posts';
import NewPostForm from './components/NewPostForm';

function App() {
    return (
        <div>
            <NewPostForm />
            <Posts />
        </div>
    );
}

export default App;
