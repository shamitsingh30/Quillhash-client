import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faThumbsUp, faBan } from '@fortawesome/free-solid-svg-icons';
import { Socket } from "socket.io-client";

function User({user, socket}){  
    const [superLike, setSuperLike] = useState(false);  
    const [like, setLike] = useState(false);  
    const [block, setBlock] = useState(false);  

    const handleNotification = (type) => {
        if(type === 1) setSuperLike(!superLike);
        else if(type === 2) setLike(!like);
        else if(type === 3) setBlock(!block);
        socket.emit("sendNotification", {
            senderName: localStorage.getItem('id'),
            receiverName: user._id,
            type
        })
        console.log(socket);
    }

    // useEffect(()=> console.log(props.socket))

    return (
        <div className="card m-5" style={{width: "18rem"}}>
            <img src={user.imageUrl} className="card-img-top my-4" alt="..."/>
            <div className="card-body">
                <h3 className="card-title" style={{color: 'black'}}>{user.name}</h3>
                <div className="d-flex justify-content-around">
                    <a onClick={()=>handleNotification(1)} style={superLike ? styles.selectedIcons: styles.icons}><FontAwesomeIcon icon={faHeart}/></a>
                    <a onClick={()=>handleNotification(2)} style={like ? styles.selectedIcons: styles.icons}><FontAwesomeIcon icon={faThumbsUp}/></a>
                    <a onClick={()=>handleNotification(3)} style={block ? styles.selectedIcons: styles.icons}><FontAwesomeIcon icon={faBan}/></a>
                </div>
            </div>
        </div>
    )
}

const styles = {
    icons: {fontSize: "1.7rem", color: "grey"},
    selectedIcons: {fontSize: "1.7rem", color: "red"}
}

export default User;