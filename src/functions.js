const convertToDate = (dateString,toStr=false) => {
    const dateParts = dateString.split("/");
    if(toStr){
        return dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0]
    }
    else{
        return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
    }
}

export default convertToDate