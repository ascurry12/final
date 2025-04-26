import React, { use } from 'react';
import { useParams } from 'react-router-dom';

const ProfileView = () => {
    const params = useParams();
    return (
        <div>
            {params.userId == 'null' ? <h2>You're not logged in!</h2> : null}
        </div>
    );
};

export default ProfileView;