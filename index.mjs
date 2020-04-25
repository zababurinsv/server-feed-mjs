import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import Enqueue from "express-enqueue";
import mongo from './mongoose.mjs'
let app = express()
import compression from "compression";
app.use(compression())
const queue = new Enqueue({
    concurrentWorkers: 2,
    maxSize: 95,
    timeout: 80000
});
app.use(bodyParser.json({limit: '40mb'}))
app.use(bodyParser.urlencoded({limit: '40mb', extended: true, parameterLimit: 50000}))

// app.use(cors())
// let whitelist = ['https://vashi-faili.web.app', 'https://vashi-faili.firebaseapp.com', 'https://universitykids.ru', 'https://www.universitykids.ru', 'http://localhost:8888', 'http://localhost:8889', 'localhost:8889']
// let corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             console.log('~~~~~~cors~~~~~~~~', origin)
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }

app.use(cors())

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:8889");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

const issue2options = {
    origin: true,
    methods: ["POST"],
    credentials: true,
    maxAge: 3600
};

app.get('/', async (req, res) => {
    let rss = await mongo({
        input:'mongo',
        model:'feed',
        type:'/'
    },'get', 'type')
    res.type('rss');
    if(rss[0]['feed'] === undefined){
        res.send(rss);
    }else{
        res.send(rss[0]['feed']['rss']);
    }


})
app.options('/feeds', cors(issue2options))
app.get('/feeds',   cors(issue2options), async (req, res) => {
    let rss = await mongo({
        input:'mongo',
        model:'feed',
        type:'/feeds'
    },'get', 'type')
    res.type('rss');
    res.send(JSON.stringify(rss));
})
app.options('/items', cors(issue2options))
app.get('/items',cors(issue2options), async (req, res) => {
    let news = await mongo({
        input:'mongo',
        model:'item',
        type:'/items'
    },'get', 'type')
    res.json(news)
})
app.options('/create-channel', cors(issue2options))
app.post('/create-channel',cors(issue2options), async (req, res) => {
    let createNews = await mongo({
        input:'mongo',
        data:req.body,
        type:'channel'

    },'create', 'type')
    res.json(createNews)
})

app.options('/create-item', cors(issue2options))
app.post('/create-item',cors(issue2options), async (req, res) => {
    let createItem = await mongo({
        input:'mongo',
        data:req.body,
        type:'item'
    },'create', 'type')
    res.json(createItem)
})
app.options('/update-feed/:id', cors(issue2options))
app.put('/update-feed/:id',cors(issue2options), async (req, res) => {

    let updateFeed = await mongo({
        input:'mongo',
        model:'feed',
        type:'feed',
        _id:req.params.id,
        data: req.body
    },'update', 'type')
    res.json(updateFeed)
})

app.options('/update-item/:id', cors(issue2options))
app.put('/update-item/:id',cors(issue2options), async (req, res) => {

    let updateFeed = await mongo({
        input:'mongo',
        model:'feed',
        type:'item',
        _id:req.params.id,
        data: req.body
    },'update', 'type')
    res.json(updateFeed)
})

app.options('/delete-item/:id', cors(issue2options))
app.delete('/delete-item/:id',cors(issue2options), async (req, res) => {

    let del = await mongo({
        input:'mongo',
        model:'item',
        type:'item',
        _id:req.params.id
    },'delete', 'type')

    res.json({sucsess: 'true'})
})


export default app
