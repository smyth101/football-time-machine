import React,{useEffect,useState} from 'react';
import convertToDate from '../functions.js'

const Timeline = (props) =>{

    const [sDate,setStartDate] = useState('')
    const [eDate,setEndDate] = useState('')
    const [progressPercent,setProgress] = useState(0)

    useEffect(()=>{
        if(props.matches.length){
            setStartDate(props.matches[0].date)
            setEndDate(props.matches[props.matches.length-1].date)
        }
    },[props.matches])


    useEffect(()=>{
        if(props.matches.length && props.matches.length !== props.matchIndex){
            console.log('m index is ', props.matchIndex , ' and len of matches is ', props.matches.length)
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
    return(
        <div>
            Speed: <select defaultValue={props.speed} onChange={(e) => {props.changeSpeed(e)}}>
                <option disabled={props.isPlaying}>Slow</option>
                <option disabled={props.isPlaying}>Normal</option>
                <option disabled={props.isPlaying}>Fast</option>
            </select>
            Year: <select defaultValue={props.filename} onChange={(e) => {props.changeFile(e)}}>
                <option value='E0-2021.csv' disabled={props.isPlaying}>2020/2021</option>
                <option value='E0-2020.csv' disabled={props.isPlaying}>2019/2020</option>
                <option value='E0-2019.csv' disabled={props.isPlaying}>2018/2019</option>
            </select>
            <input type='date' min={(sDate)?convertToDate(sDate,true):'yyyy-mm-dd'} max={(eDate)?convertToDate(eDate,true):''} disabled={props.isPlaying} onChange={(e) => {props.setDate(e)}}></input>
            <div style={{width:'100%', height:'20px', backgroundColor:'gray'}}>
                <div style={{width:progressPercent + '%', height:'100%',backgroundColor:'blue'}}></div>
            </div>
        </div>
    )
}




export default Timeline;