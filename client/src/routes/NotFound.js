import React, {useEffect} from 'react';
import NotFoundBackground from '../image/404.png';

function NotFound() {

    useEffect(()=> {
        document.addEventListener("contextmenu", (e)=> e.preventDefault());
    },[]);
    
    return (
        <div>
            <img src={NotFoundBackground} alt="404" style={{width: "100%", height:"100vh", objectFit: "cover"}} />
        </div>
    )
}

export default NotFound;
