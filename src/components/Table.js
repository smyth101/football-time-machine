import React from 'react';
import TeamRow from './TeamRow.js';

const Table = (props) =>{
        return(
            <div className='league-table'>
                <div className='row font-weight-bold' style={{paddingLeft:'40px'}}>
                    <div className='col-1 offset-7 p-0'>
                        mp
                    </div>
                    <div className='col-1 p-0'>
                        gf
                    </div>
                    <div className='col-1 p-0'>
                        ga
                    </div>
                    <div className='col-1 p-0'>
                        gd
                    </div>
                    <div className='col-1 p-0'>
                        pts
                    </div>
                </div>
                <div className='table-content'>
                    <div style={{position:'relative',height:'100%',textAlign:'left'}}>
                        {props.teams.map((team,index) =>{
                            return <span style={{position:'absolute',top:100/props.tableSize * index + '%'}} key={index}>{index + 1}</span>
                        })}
                    </div>
                {props.teams.map(team => {
                    return <TeamRow name={team.name} pts={team.pts} played={team.played} pos={team.pos} gd={team.gd} tableSize={props.tableSize} gf={team.gf} ga={team.ga} key={team.name} speed={props.speed}/>
                    })}
                </div>
            </div>
        )
}

export default Table;