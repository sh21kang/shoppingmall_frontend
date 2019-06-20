
function getTime(timestamp){
    let date = new Date(timestamp);

    let year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1; // getMonth() is zero-indexed, so we'll increment to get the correct month number
    let day = date.getUTCDate();
    // var hours = date.getUTCHours();
    // var minutes = date.getUTCMinutes();
    // var seconds = date.getUTCSeconds();
    
    month = (month < 10) ? '0' + month : month;
    day = (day < 10) ? '0' + day : day;
    
    
    return year + '-' + month + '-' + day
    
}

export {getTime}