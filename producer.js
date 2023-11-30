const kafka = require('./client');
const axios = require('axios');
require('dotenv').config();

const makeRequestAllFligths = async () => {
    try{
        
        const producer = kafka.producer();
        await producer.connect();
        console.log('Conectado al servidor de kafka');
        const response = await axios.get(`https://airlabs.co/api/v9/flights?api_key=${process.env.API_KEY}&_fields=lat,lng,dir,alt,flag,airline_iata,aircraft_icao,flight_number,dep_iata,arr_iata,status&flag=MX`);
        const flights = [];
        console.log('Enviando informacion a Kafka')
        response.data.response.forEach(item => {
            console.log(item);
            flights.push({
                flight_number: item.flight_number,
                airline_iata: item.airline_iata,
                status: item.status,
                lat: item.lat,
                lon: item.lng,
                dir: item.dir,
                alt: item.alt,
                flag: item.flag,
                aircraft_icao: item.aircraft_icao,
                dep_iata: item.dep_iata,
                arr_iata: item.arr_iata,
            });
        });
        
        for (let partition=0;partition<3;partition++){
            await producer.send({
                topic:'vuelos',
                messages:[
                    {value:JSON.stringify(flights)},
                ],
                partition:partition
            });
        }
        console.log('Informacion enviada');
        await producer.disconnect();   
    
    }
    catch(err){
        console.log(err);
    }
}

console.log('Iniciando servicio de kafka');
setInterval(makeRequestAllFligths, 60000);