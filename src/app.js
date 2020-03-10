const hbs=require('hbs')
const express=require('express')
const path=require('path')
const app=express()
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const publicDir=path.join(__dirname,'../publicDir')
const partialsDir=path.join(__dirname,'../views/partials')
app.use(express.static(publicDir))

app.set('view engine','hbs')
hbs.registerPartials(partialsDir)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        footer:'Created and maintained by AshGaur'
    })
})

app.get('/weather',(req,res)=>{
    const place=req.query.place
    if(!place){
        res.send({
            error:'Please enter a location !!!'
        })
    }
    else{
        geocode(place,(error,data)=>{
            if(error){
                res.send({
                    error:error
                })
            }else{
                forecast(data.latitude,data.longitude,(error,{summary,precipProbability})=>{
                    res.send({
                        place:data.place_name,
                        summary:summary,
                        precipProbability:precipProbability,
                        error:error
                    })
                })
            }
        })
    }
})

app.listen(8080,()=>{
    console.log('Server running on port 8080')
})