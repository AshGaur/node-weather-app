const request=require('request')
const geocode=(place,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+place+'.json?access_token=pk.myprivateaccesskey&limit=1'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('No Internet',undefined)
        }
        else if(response.body.features.length===0){
            callback('Unknown Place',undefined)
        }
        else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                place_name:response.body.features[0].place_name
            })
        }
    })
}

module.exports=geocode