import React,{useEffect,useState} from 'react';
import convertToDate from '../functions.js'

const Timeline = (props) =>{

    const [sDate,setStartDate] = useState('')
    const [eDate,setEndDate] = useState('')
    const [progressPercent,setProgress] = useState(0)
    const [league,setLeague] = useState('premier-league')
    const [year,setYear] = useState(2021)

    const leaguesAndYears = [
        {
            'league':'premier-league',
            'years':[2021,2020,2019,2018,2017,2016,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001],
            'title':'Premier League'
        },
        {
            'league':'ligue1',
            'years':[2020],
            'title':'Ligue 1'
        }
    ]

    useEffect(()=>{
        if(props.matches.length){
            console.log('effect has been triggered')
            setStartDate(props.matches[0].date)
            console.log('new start date is ', props.matches[0].date)
            console.log('new end date is ', props.matches[props.matches.length-1].date)
            setEndDate(props.matches[props.matches.length-1].date)
        }
    },[props.matches])


    useEffect(()=>{
        if(props.matches.length && props.matches.length !== props.matchIndex){
            setProgress(getDateProgress(sDate,eDate,props.matches[props.matchIndex].date))
        }
    },[props.matchIndex])

    const getDateProgress = (startDate,endDate,currentDate) =>{
        startDate = convertToDate(startDate); 
        endDate = convertToDate(endDate); 
        currentDate = convertToDate(currentDate); 
        let startToEndTime = endDate.getTime() - startDate.getTime(); 
        let startToEndDays = startToEndTime / (1000 * 3600 * 24); 
        let startToCurrentTime = currentDate.getTime() - startDate.getTime(); 
        let startToCurrentDays = startToCurrentTime / (1000 * 3600 * 24); 
        let progress = (startToCurrentDays / startToEndDays) * 100
        return progress
    }

    const changeLeague = (e) => {
        setLeague(e.target.value)
        let x = leaguesAndYears.find(obj => obj.league === e.target.value).years
        const currentYears = leaguesAndYears.find(obj => obj.league === e.target.value).years
        const yearIncluded = currentYears.includes(year)
        if(!yearIncluded){
            setYear(currentYears[0])
        }
    }

    useEffect(()=>{
        props.changeFile(league + '/' + year + '.csv')
    },[league,year])

    return(
        <div>
            Speed: <select defaultValue={props.speed} onChange={(e) => {props.changeSpeed(e)}}>
                <option disabled={props.isPlaying}>Slow</option>
                <option disabled={props.isPlaying}>Normal</option>
                <option disabled={props.isPlaying}>Fast</option>
            </select>
            League: <select defaultValue={league} onChange={(e) => {changeLeague(e)}}>
                {leaguesAndYears.map(league => {
                    return (<option value={league.league} disabled={props.isPlaying}>{league.title}</option>)
                })}
            </select>
            Year: <select value={year} onChange={(e) => {setYear(parseInt(e.target.value))}}>
                {
                    leaguesAndYears.find(obj => obj.league === league).years.map(year => {
                    return (<option disabled={props.isPlaying} value={year}>{year}</option>)
                    })

                }
            </select>
            <input type='date' min={(sDate)?convertToDate(sDate,true):'yyyy-mm-dd'} max={(eDate)?convertToDate(eDate,true):''} disabled={props.isPlaying} onChange={(e) => {props.setDate(e)}}></input>
            <div style={{width:'100%', height:'20px', backgroundColor:'gray'}}>
                <div style={{width:progressPercent + '%', height:'100%',backgroundColor:'blue'}}></div>
            </div>
        </div>
    )
}




export default Timeline;