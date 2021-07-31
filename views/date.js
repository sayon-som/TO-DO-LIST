module.exports.date=function (){
    var today=new Date();
    var options={
            weekday:"long",
            year:"numeric",
            month:"long",
            day:"numeric"
    }
    let dates= today.toLocaleDateString("en-US",options);
    return dates;
}
module.exports.day= function(){
        var today=new Date();
        var options={
                weekday:"long",
                
        }
        let dates= today.toLocaleDateString("en-US",options);
        return dates;
    }
    