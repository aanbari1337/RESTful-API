const express  = require('express')
const moongose = require('mongoose')
const Joi = require('joi')
const router = express.Router()

const Genre =new moongose.model('Genre', new moongose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
}))

router.get('/', (req, res)=>{
    res.send(genres)
})

router.post('/', (req, res)=>{
    const {error} = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre)
    res.send(genre)
})

// router.put('/:id', (req, res)=>{
    
// })

// router.delete('/:id', (req, res)=>{
  
// })

// router.get('/:id', (req, res)=>{
// })

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    })

    return schema.validate(genre)
}

module.exports = router