import React,{useEffect,useState} from 'react';
import convertToDate from '../functions.js'

const Timeline = (props) =>{

    const [sDate,setStartDate] = useState('')
    const [eDate,setEndDate] = useState('')
    const [progressPercent,setProgress] = useState(0)
    const [league,setLeague] = useState('premier-league')
    const [year,setYear] = useState(2021)

    const leaguesAndYears = [
        // premier league 2015 and ligue 1 2016 csv files are incomplete hence why they have been left out of year listings
        {
            'league':'premier-league',
            'years':[2021,2020,2019,2018,2017,2016,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001],
            'title':'Premier League'
        },
        {
            'league':'ligue1',
            'years':[2020,2019,2018,2017,2015],
            'title':'Ligue 1'
        }
    ]

    useEffect(()=>{
        if(props.matches.length){
            setStartDate(props.matches[0].date)
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
        <div className='w-100 mt-4'>
            {/* <div className='row'> */}
                <div className='d-inline-block m-2'>
                    Speed: <select defaultValue={props.speed} onChange={(e) => {props.changeSpeed(e)}}>
                        <option disabled={props.isPlaying}>Slow</option>
                        <option disabled={props.isPlaying}>Normal</option>
                        <option disabled={props.isPlaying}>Fast</option>
                    </select>
                </div>
                <div className='d-inline-block m-2'>
                    League: <select defaultValue={league} onChange={(e) => {changeLeague(e)}}>
                        {leaguesAndYears.map((league,index) => {
                            return (<option value={league.league} disabled={props.isPlaying} key={league.league}>{league.title}</option>)
                        })}
                    </select>
                </div>
                <div className='d-inline-block m-2'>
                    Year: <select value={year} onChange={(e) => {setYear(parseInt(e.target.value))}}>
                        {
                            leaguesAndYears.find(obj => obj.league === league).years.map(year => {
                            return (<option disabled={props.isPlaying} value={year} key={league + year}>{year}</option>)
                            })

                        }
                    </select>
                </div>
                <div className='d-inline-block m-2'>
                    Date: <input type='date' min={(sDate)?convertToDate(sDate,true):'yyyy-mm-dd'} max={(eDate)?convertToDate(eDate,true):''} disabled={props.isPlaying} onChange={(e) => {props.setDate(e)}}></input>
                </div>
            {/* </div> */}
            <div className='progress-container row rounded mt-2 mb-3'>
                <div className='progress-b rounded' style={{width:progressPercent + '%'}}></div>
            </div>
        </div>
    )
}




export default Timeline;