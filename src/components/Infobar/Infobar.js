import React from 'react'
import './Infobar.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import OnlinePredictionOutlinedIcon from '@mui/icons-material/OnlinePredictionOutlined';

const Infobar = ({room}) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
               <OnlinePredictionOutlinedIcon className="onlineIcon"/>
                <h3>{room}</h3>

            </div>
            <div className="rightInnerContainer">
                <a href="/Roomchat/"><CloseOutlinedIcon/></a>
            </div>
            
        </div>
    )
}

export default Infobar
