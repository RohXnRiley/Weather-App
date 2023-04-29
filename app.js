const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')

const app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('index',{
        city : 'Enter City',
        description : '',
        temperature : '',
        windspeed : '',
        degree : '',
        hum : '',
        pres : '',
        icon : ''
    });
})

app.post('/',(req,res)=>{
    
    const query = req.body.query;
    const appid = '01462d68a2de62a4551630e9dbda441e'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+appid+'&units=metric'

    https.get(url,(response)=>{

        response.on('data',(data)=>{
            const weatherdata = JSON.parse(data);
            // console.log(weatherdata);

            const desc = weatherdata.weather[0].description;
            const temp = weatherdata.main.temp;
            const speed = weatherdata.wind.speed;
            const deg = weatherdata.wind.deg;
            const humidity = weatherdata.main.humidity;
            const pressure = weatherdata.main.pressure;
            const icon_number = weatherdata.weather[0].icon;
            const icon = 'http://openweathermap.org/img/wn/'+icon_number+'@2x.png';


            console.log(desc,temp,speed,deg,humidity,pressure);

            res.render('index',{
                city  : query,
                description : desc,
                temperature : temp,
                windspeed : speed,
                degree : deg,
                hum : humidity,
                pres : pressure,
                icon : icon
            });

        })
    })

})

app.listen(3000, ()=>{
    console.log('Server is Up');
})