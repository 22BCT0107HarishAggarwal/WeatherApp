import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'

export default function Weather() {

    let tempobj=[{temp:'_', humidity:'_', mintemp:'_', maxtemp:'_'}];
    const [city, changecity] = useState("");
    const [weather, weatherdata] = useState(tempobj);
    const URL = 'http://api.openweathermap.org/geo/1.0/direct?';
    const URLW = 'https://api.openweathermap.org/data/2.5/weather?lat='
    const Key = 'd570337b9ef803e9573b2345e6f2d9b9'; 
    let imgurl=`https://eczema.org/wp-content/uploads/Sun-and-clouds.jpg`;

    async function data() {
        document.getElementById('Check').innerHTML = '';
        try {
            const response = await fetch(URL + 'q=' + document.getElementById('SearchBox').value + '&limit=5' + '&appid=' + Key);
            const datainfo = await response.json();
            console.log(datainfo)
            changecity(datainfo[0].name);
            let lat = datainfo[0].lat;
            let longi = datainfo[0].lon;
            try {
                const weathresp = await fetch(URLW + lat + '&lon=' + longi + '&appid=' + Key);
                const weathinfo=await  weathresp.json();
                console.log(weathinfo);
                const updatedWeather = {
                    temp: (weathinfo.main.temp) - 272.15,
                    humidity: weathinfo.main.humidity,
                    mintemp: (weathinfo.main.temp_min) - 272.15,
                    maxtemp: (weathinfo.main.temp_max) - 272.15
                };
                weatherdata(updatedWeather);
            } catch (error) {
                console.log('Error:', error);
            }
        } catch (error) {
            document.getElementById('Check').innerHTML = 'City not Found!';
            console.log("City Not found in data, therefore error");
        }
    }

    return (<div>
        <h2>Enter the City Name </h2>
        <br />
        <form action="">
            <TextField id="SearchBox" label="City Name" variant="outlined" required />
            <br />
            <br />
            <Button type='button' variant='contained' onClick={data}>Search</Button>
        </form>
        <br />
        <h3 id='Check' style={{color:'red'}}></h3>
        <br></br>
        <center>
        <Card sx={{ maxWidth: 420 }}>
            <CardMedia sx={{ height: 200 }} image={imgurl} title="Image" />
            <CardContent>
                <Typography variant='h4' component="div">
                    {city}
                </Typography>
                <p>Temp:&nbsp; {weather.temp}&deg;&nbsp;C</p>
                <p>Humidity:&nbsp; {weather.humidity}</p>
                <p>Minimum Temp:&nbsp; {weather.mintemp}&deg;&nbsp;C</p>
                <p>Maximum Temp:&nbsp; {weather.maxtemp}&deg;&nbsp;C</p>
            </CardContent>
        </Card>
        </center>
    </div>
    )
}

