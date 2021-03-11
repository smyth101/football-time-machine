import './App.css';
import React, {useState,useEffect,useRef} from 'react';
import Table from './components/Table.js';
import Timeline from './components/Timeline.js';
import MatchFlow from './components/MatchFlow.js';
import convertToDate from './functions.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () =>{
  
  const [teams,setTeams] = useState([])
  const [tableSize,setTableSize] = useState(0)
  const [isPlaying,setPlaying] = useState(false)
  const playing = useRef(false)
  const [speed,setSpeed] = useState('Normal')
  const [matches,setMatches] = useState([])
  const [matchIndex,setMatchIndex] = useState(0)
  const [endDate,setEndDate] = useState('')
  const [filename,setFilename] = useState('premier-league/2021.csv')
  
  
  const speeds = {'Normal':1000,'Fast':100,'Slow':5000}
    
    useEffect(() => {
      initTeams(filename)
    },[]);


  const runTimeline = async (games,date=false,dateObj=false) =>{
    let pace
    if(date){
      pace = 0
    }
    else{
      pace = speeds[speed]
    }
    if(games.length == 0){
      return
    }
    let match = games[0]
    let nextMatch = games[1] ?? match
    let matchDate = convertToDate(nextMatch.date)
    let chosenDate = new Date(date)
    let newDateObj
    if(date){
      if(games.length == 1 || matchDate > chosenDate){
        addResult(match.homeTeam,match.awayTeam,match.homeGoals,match.awayGoals,{'teams':dateObj.teams,'mIndex':dateObj.mIndex,'last':true})    
      }
      else{
        newDateObj = addResult(match.homeTeam,match.awayTeam,match.homeGoals,match.awayGoals,{'teams':dateObj.teams,'mIndex':dateObj.mIndex,'last':false})    
      }
    }
    else{
      addResult(match.homeTeam,match.awayTeam,match.homeGoals,match.awayGoals)
    }
    setTimeout(()=>{
      if(!playing.current){
        return
      }
      else if(date){
        if(matchDate > chosenDate){
          setPlaying(false)
          playing.current = false
          setEndDate('')

        }
        else{
          runTimeline(games.slice(1),endDate,newDateObj)
        }
      }
      else{
        runTimeline(games.slice(1))
      }
    },pace)

  }

  //increment match count once game has been rendered and team values updated
  useEffect(() => {
    let playedGames = teams.filter(team => {
      if(team.played > 0){
        return team.played
      }
    })
    if(tableSize && playedGames.length ){
        setMatchIndex(matchIndex + 1)
      
    }
  },[teams]);
  
  const initTeams = async (fname) =>{
    const rows = await fetch(fname).then(response => response.text()).then(table => table.trim().split('\n'))
    const header = rows.slice(0,1)
    const headerCols = header[0].split(',')
    let dateIndex,homeTeamIndex,awayTeamIndex,homeGoalsIndex,awayGoalsIndex
    headerCols.forEach((col,index) => {
      if(col === 'Date'){
        dateIndex = index
      }
      else if(col === 'HomeTeam'){
        homeTeamIndex = index
      }
      else if(col === 'AwayTeam'){
        awayTeamIndex = index
      }
      else if(col === 'FTHG'){
        homeGoalsIndex = index
      }
      else if(col === 'FTAG'){
        awayGoalsIndex = index
      }
    });
    const table = rows.slice(1) 
    let teams =[];
    let matches = [];
    table.forEach(row => {
      let cols = row.split(',')
      let homeTeam = cols[homeTeamIndex]
      let awayTeam = cols[awayTeamIndex]
      let homeGoals = cols[homeGoalsIndex]
      let awayGoals = cols[awayGoalsIndex]
      let date = cols[dateIndex]
      matches.push({'homeTeam':homeTeam,'awayTeam':awayTeam,'homeGoals':homeGoals,'awayGoals':awayGoals,'date':date})
      if(!teams.includes(cols[awayTeamIndex])){
        teams.push(cols[awayTeamIndex])
      }
    })
    let sortedTeams = teams.sort().map((team,index) => {
      return {'name':team,'pos':index+1,'played':0,'pts':0,'gd':0,'gf':0,'ga':0}
    });
    setTeams(sortedTeams)
    setTableSize(teams.length)
    setMatches(matches)
  }


  const addResult = (homeTeam,awayTeam,homeGoals,awayGoals,dateObj = false) => {
    let currentTeams  
    if(dateObj){
        currentTeams = dateObj.teams
    }
    else{
      currentTeams = teams
    }
    homeGoals = parseInt(homeGoals)
    awayGoals = parseInt(awayGoals)
    let updatedTeams = currentTeams.map(team => {
      if(team.name === homeTeam){
        if(homeGoals > awayGoals){
          team.pts += 3;
        }
        else if(homeGoals === awayGoals){
          team.pts +=1;
        }
        team.gf += homeGoals;
        team.ga += awayGoals;
        team.played += 1;
        team.gd += (homeGoals - awayGoals)
      }
      else if(team.name === awayTeam){
        if( awayGoals > homeGoals){
          team.pts += 3;
        }
        else if(homeGoals === awayGoals){
          team.pts +=1;
        }
        team.gf += awayGoals;
        team.ga += homeGoals;
        team.played += 1;
        team.gd += (awayGoals - homeGoals)
      }

      return team;
    })
    // stable sort leaving list unchanged in event of two teams even on all values
    let sortedTeams = updatedTeams.sort((a, b) => 
    (a.pts < b.pts) ? 1 : (a.pts === b.pts)?(a.gd < b.gd)?1:(a.gd === b.gd)?b.gf - a.gf:-1:-1
    )

    let sortedUpdatedTeams = sortedTeams.map((team,index) => {
      team.pos = index + 1
      return team
    })
    let finalTeams  = sortedUpdatedTeams.sort((a,b) => (a.name < b.name)?1:-1)
    if(dateObj){
      if(dateObj.last){
        setMatchIndex(dateObj.mIndex)
        setTeams(finalTeams)
      }
      else{
        return {'teams':finalTeams,'mIndex': dateObj.mIndex + 1}
      }
    }
    else{
      setTeams(finalTeams)
    }


  }

  const changeSpeed = (event) => {
    setSpeed(event.target.value)
  }

  const changeFile = (file) =>{
    setFilename(file)
  }

  
  // reinitialize table with selected years data
  useEffect(()=>{
    restart()
  },[filename])
  


  const play = () =>{
    playing.current  = true
    let remainingMatches = matches.slice(matchIndex)
    setPlaying(true)
    if(endDate){
      if(new Date(endDate) < convertToDate(remainingMatches[0].date)){
        setMatchIndex(0)
        let initTeams = teams.map((team,index) => {
          team.pos = index+1
          team.played = 0
          team.gf = 0
          team.ga = 0
          team.gd = 0
          team.pts = 0
          return team
        });
        runTimeline(matches,endDate,{'teams':initTeams,'mIndex':0})
      }
      else{
        runTimeline(remainingMatches,endDate,{'teams':teams,'mIndex':matchIndex})
      }
    }
    else{
      runTimeline(remainingMatches)
    }
  }

  const pause = () => {
    playing.current = false
    setPlaying(false)
  }

  const restart = () =>{
    setMatchIndex(0)
    initTeams(filename)
    playing.current  = false
    setPlaying(false)
  }

  const setDate = (e) => {
    setEndDate(e.target.value)
  }

  let playedMatches = matches.slice(0,matchIndex)
  return(
  <div className='App'>
    <div id='header'>
      <img src='new-ball.png'></img>
      <h1>Football Time Machine</h1>
      <img src='old-ball.png'></img>
    </div>
    <div className='main-container'>
      <Timeline isPlaying={isPlaying} speed={speed} changeSpeed={changeSpeed} matches={matches} matchIndex={matchIndex} setDate={setDate} changeFile={changeFile} filename={filename}></Timeline>
      <MatchFlow matches={playedMatches}></MatchFlow>
      <Table teams={teams} tableSize={tableSize} speed={speeds[speed]}/>
      <PlayPauseBtn runTimeline={runTimeline} matches={matches} isPlaying={isPlaying} pause={pause} play={play} restart={restart} matchIndex={matchIndex}></PlayPauseBtn>
    </div>
  </div>
  )
}


const PlayPauseBtn = (props) => {
  if(props.matches.length > 0 &&props.matchIndex == props.matches.length){
    return(
      <div>
        <button className='btn btn-primary mb-2' onClick={() => {props.restart()}}>
          Restart
        </button>
      </div>
    )
  }
  if(props.isPlaying){
    return (<div>
      <button className='btn btn-primary mb-2' onClick={() => {props.pause()}}>
        Pause
      </button>
    </div>)
  }
  else{
    return (<div>
        <button className='btn btn-primary mb-2' onClick = {() => {props.play();}}>
          Play
        </button>
      </div>)
  }
}
export default App;
