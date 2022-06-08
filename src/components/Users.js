import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faThumbsUp, faBan } from '@fortawesome/free-solid-svg-icons';

function User(props){  
    const [superLike, setSuperLike] = useState(false);  
    const [like, setLike] = useState(false);  
    const [block, setBlock] = useState(false);  

    return (
        <div className="card m-5" style={{width: "18rem"}}>
            <img src={props.user.imageUrl} className="card-img-top my-4" alt="..."/>
            <div className="card-body">
                <h3 className="card-title" style={{color: 'black'}}>{props.user.name}</h3>
                <div className="d-flex justify-content-around">
                    <a onClick={()=>setSuperLike(!superLike)} style={superLike ? styles.selectedIcons: styles.icons}><FontAwesomeIcon icon={faHeart}/></a>
                    <a onClick={()=>setLike(!like)} style={like ? styles.selectedIcons: styles.icons}><FontAwesomeIcon icon={faThumbsUp}/></a>
                    <a onClick={()=>setBlock(!block)} style={block ? styles.selectedIcons: styles.icons}><FontAwesomeIcon icon={faBan}/></a>
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