import React from 'react';

const TeamRow = (props) =>{

        let top = (100/props.tableSize)*(props.pos-1) + '%'   
        return(
        <div style={{borderBottom: '1px solid',position:'absolute',top:top,left:'20px',transition:'top ' + props.speed + 'ms'}}>
            <div style={{display:'inline-block',width:'350px'}}>{props.name} </div>
            <div style={{display:'inline-block',width:'40px'}}>{props.played} </div>
            <div style={{display:'inline-block',width:'40px'}}>{props.gf} </div>
            <div style={{display:'inline-block',width:'40px'}}>{props.ga} </div>
            <div style={{display:'inline-block',width:'40px'}}>{props.gd} </div>
            <div style={{display:'inline-block',width:'40px'}}>{props.pts} </div>

        </div>
        )
}




export default TeamRow;