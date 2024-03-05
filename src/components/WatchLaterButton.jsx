//WatchLaterButton.jsx
import React, { useState } from 'react';

const WatchLaterButton = ({ video }) => {
    const [watchLaterList, setWatchLaterList] = useState([]);

    const addToWatchLater = () => {
        setWatchLaterList([...watchLaterList, video]);
    };

    return (
        <button onClick={addToWatchLater}>Assistir mais tarde</button>
    );
};

export default WatchLaterButton;
