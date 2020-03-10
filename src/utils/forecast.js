const request=require('request')

const forecast=(lat,lon,callback)=>{
    const url='https://api.darksky.net/forecast/myprivateaccesskey/'+lat+','+lon
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('No Internet',undefined)
        }
        else if(response.body.error){
            callback('Unknown coordinates',undefiend)
        }
        else{
            callback(undefined,{
                summary:response.body.daily.data[0].summary,
                precipProbability:response.body.daily.data[0].precipProbability
            })
        }
    })
}

module.exports=forecast