const csv_parser = require('csv-parse');
const fs = require('fs');

output = [];

function isHabitablepalent(planet){
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}
fs.createReadStream('Kepler_data.csv')
.pipe(csv_parser.parse({
    comment : '#',
    columns : true
}))
.on('data', (data)=>{
    if(isHabitablepalent(data))
    {
        output.push(data);
    }
})

.on('error', (error)=>{
    console.log(`error occured ${error}`);
})
.on('end', ()=>{
    console.log(output.map((planet) => { return planet['kepoi_name']}))
    console.log("done");
});

