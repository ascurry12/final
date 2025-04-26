import React from 'react';
import { supabase } from "../client.js";
import { useState, useRef } from "react";
import { useUser } from "../../UserContext.jsx";
import './Card.css';
import moment from 'moment';

const Card = (props) => {

    return (
        <div className='Card'>
            {console.log(props.title)}
            
            <p>Posted {moment.utc(props.created_at).local().startOf('seconds').fromNow()}</p>
            <h2>{props.title}</h2>
            <p>{props.likes} upvotes</p>
            
            
        </div>
    );
};

export default Card;