import React from 'react';

const MatchFlow = (props) => {

    const showDate =(date,prevDate) =>{
        if(date !== prevDate){
            return (<div>{date}</div>)
        }
        return
    }
    const revMatches = props.matches.slice(0).reverse()
    return(<div style={{overflow:'scroll',height:'200px',backgroundColor:'#ccf5ff'}}>{revMatches.map((match,index)=>{
        const prevMatch = revMatches[index - 1] ?? match
        if(index === 0){
        return(<div style={{fontSize:'22px'}} key={index}><div>{match.date}</div>{match.homeTeam} {match.homeGoals} - {match.awayGoals} {match.awayTeam}</div>)
        }
        else{
            return(<div key={index}><span>{showDate(match.date,prevMatch.date)}</span>{match.homeTeam} {match.homeGoals} - {match.awayGoals} {match.awayTeam}</div>)
        }
    })}</div>)

}

export default MatchFlow;