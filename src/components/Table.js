import React from 'react';
import TeamRow from './TeamRow.js';

const Table = (props) =>{
        return(
            <div style={{height:'50vh',backgroundColor:'#fffff',position:'relative',textAlign:'left'}}>
                <div style={{position:'relative',height:'100%'}}>
                    {props.teams.map((team,index) =>{
                        return <span style={{position:'absolute',top:100/props.tableSize * index + '%'}} key={index}>{index + 1}</span>
                    })}
                </div>
               {props.teams.map(team => {
                   return <TeamRow name={team.name} pts={team.pts} played={team.played} pos={team.pos} gd={team.gd} tableSize={props.tableSize} gf={team.gf} ga={team.ga} key={team.name} speed={props.speed}/>
                })}
            </div>
        )
}

export default Table;