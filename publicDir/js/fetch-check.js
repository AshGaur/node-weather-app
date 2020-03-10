const inputvar=document.querySelector('input')
const formvar=document.querySelector('form')
const err=document.querySelector('#error')
const forec=document.querySelector('#forecast')
const placevar=document.querySelector('#place')
const precipvar=document.querySelector('#precip')

formvar.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(inputvar.value==''){
        err.textContent='Please enter a location'
        placevar.textContent=''
        forec.textContent=''
        precipvar.textContent=''
    }else{
        err.textContent=''
        placevar.textContent=''
        precipvar.textContent=''
        forec.textContent='Loading.......'
        const url='http://localhost:8080/weather?place='+inputvar.value
        fetch(url).then((response)=>{
            response.json().then(({place,summary,precipProbability,error})=>{
                if(error){
                    err.textContent=error
                    forec.textContent=''
                }else{
                    placevar.textContent=place
                    forec.textContent=summary
                    precipvar.textContent=' There\'s '+precipProbability*100+'% chance of rain'
                }
            })
        })
    }
})