const request = require('request');
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, {useNewUrlParser: true});

request('https://www.shazam.com/shazam/v2/ru/UA/web/-/tracks/world-chart-world?pageSize=200&startFrom=0', (error, response, html) => { 
    let obj_html = JSON.parse(html);
    var objS = {};

    mongoClient.connect(function (err, client) {
        const mongoDb = client.db("Parse");
        const collection = mongoDb.collection("Result");

        for (let i = 0; i < 100; i++) {
            const name = obj_html['chart'][i]['share']['subject'];
            const link = obj_html['chart'][i]['share']['href'];
            const image = obj_html["chart"][i]["share"]["image"];
            number = i + 1;

            objS = {
                number,
                name,
                link,
                image
            };

            console.log(objS);
            collection.insertOne(objS, function (err, results) {
                console.log(results.ops);
            });
        }
        client.close();
    })
})