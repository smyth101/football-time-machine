const convertToDate = (dateString,toStr=false) => {
    const dateParts = dateString.split("/");
    const year = (dateParts[2].length === 2)?'20' + dateParts[2]:dateParts[2]
    const month = dateParts[1]
    const day = dateParts[0]
    if(toStr){
        return year + '-' + month + '-' + day
    }
    else{
        return new Date(+year, month - 1, +day)
    }
}

export default convertToDate