//CRUDDataBase
const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const conectionString = 'mongodb+srv://franciscalandwehr:CRUDDataBase@cluster0.yqifjp6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const PORT = process.env.PORT || 3000

MongoClient.connect(conectionString)
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')

        app.set('view engine', 'ejs')
        app.use(bodyparser.urlencoded({extended: true}))
        app.use(express.static('public'))
        app.use(bodyparser.json())

        app.get('/', (request, response) =>{
            //respond.send('This is Lit!!!')
            quotesCollection.find().toArray()
                .then(results => {
                    //console.log(results)
                    response.render('index.ejs',{quotes: results})
                })
                .catch(error => console.log(error))            
        })
        app.post('/quotes', (request, response)=>{
            quotesCollection.insertOne(request.body)
            .then(result => {
                //console.log(result)
                response.redirect('/')
            })
            .catch(error => console.error(error))
        })
        app.put('/quotes', (request, response) =>{
            quotesCollection.findOneAndUpdate(
                {name: 'Gordo'},
                {$set:{
                    name: request.body.name,
                    quote: request.body.quote
                }},
                {
                    upsert: true
                }
            )
            .then(result => {
                console.log(result)
                response.json('Success')
            })
            .catch(error => console.error(error))
        })
        app.delete('/quotes/one', (req, res)=>{
            quotesCollection.deleteOne(
                {name: req.body.name}
            )
            .then(result =>{
                res.json('Deleted Darth Vedars quote')
            })
            .catch(error => console.error(error))
            
        })
        app.delete('/quotes/all', (req, res) =>{
            quotesCollection.deleteMany({})
            .then(result =>{
                 res.json('Deleted all quotes')
            })
            .catch(error => console.error(error))
        })
            
            
        app.listen(PORT, ()=>{
            console.log(`Your browser is running on port: ${PORT}`)
        })
})
    .catch(error => console.error(error))
