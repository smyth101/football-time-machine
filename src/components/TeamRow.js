import React, { useCallback } from 'react';

const TeamRow = (props) =>{

        let top = (100/props.tableSize)*(props.pos-1) + '%'   
        return(
        <div className='row text-center w-100' style={{borderBottom: '1px solid',position:'absolute',top:top,left:'40px',transition:'top ' + props.speed + 'ms',backgroundColor:'#4949d0'}}>
            <div className='col-7 text-left' >{props.name} </div>
            <div className='col-1 p-0' >{props.played} </div>
            <div className='col-1 p-0' >{props.gf} </div>
            <div className='col-1 p-0' >{props.ga} </div>
            <div className='col-1 p-0' >{props.gd} </div>
            <div className='col-1 p-0' >{props.pts} </div>

        </div>
        )
}




export default TeamRow;