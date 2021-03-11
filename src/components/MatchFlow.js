import React from 'react';

const MatchFlow = (props) => {
    const showDate =(date,prevDate) =>{
        if(date !== prevDate){
            return (<div className='results-date'>{date}</div>)
        }
        return
    }
    const revMatches = props.matches.slice(0).reverse()
    return(<div className='matchflow-container'>{revMatches.map((match,index)=>{
        const prevMatch = revMatches[index - 1] ?? match
        if(index === 0){
        return(<div className='recent-result' key={index}><div className='recent-date'>{match.date}</div>{match.homeTeam} {match.homeGoals} - {match.awayGoals} {match.awayTeam}</div>)
        }
        else{
            return(<div key={index}><span>{showDate(match.date,prevMatch.date)}</span>{match.homeTeam} {match.homeGoals} - {match.awayGoals} {match.awayTeam}</div>)
        }
    })}</div>)

}

export default MatchFlow;