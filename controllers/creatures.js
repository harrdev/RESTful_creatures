const express = require('express')
const router = express.Router()
const fs = require('fs')

// INDEX ROUTE
router.get('/', (req, res)=>{
    let creature = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creature)

    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        creatureData = creatureData.filter((creature)=>{
             return creature.type.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('creatures/index.ejs', {creatureData: creatureData})
})

// NEW ROUTE
router.get('/new', (req, res) => {
    res.render('creatures/new.ejs')
})

// GET UPDATE FORM
router.get('/edit/:idx', (req, res)=>{
    let creature = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creature)

    res.render('creatures/edit.ejs', {creatureId: req.params.idx, creature: creatureData[req.params.idx]})
})

// UPDATE ROUTE
router.put('/:idx', (req, res)=>{
    let creature = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creature)

    // re-assign the name an img_url fields of the creatures to be editted
    creatureData[req.params.idx].type = req.body.type
    creatureData[req.params.idx].img_url = req.body.img_url

    // save the editted creatures to the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/creatures')
})

// SHOW ROUTE
// When user goes to creater/index#, it does the following:
router.get('/:idx', (req, res)=>{
    // get creatures array
    let creature = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creature)

    // get array index from url parameter
    let creatureIndex = req.params.idx

    res.render('creatures/show.ejs', {myCreature: creatureData[creatureIndex]})
})

// POST NEW ROUTE
router.post('/', (req, res)=>{
    // get creatures array
    let creature = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creature)

    // add new creatures to creaturesData
    creatureData.push(req.body)

    // save updated creaturesData to json
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    // redirect to GET /creatures (index)
    res.redirect('/creatures')
})

// DELETE ROUTE
router.delete('/:idx', (req, res)=>{
    // get creatures array
    let creature = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creature)

    // remove the deleted creatures from the creatures array
    creatureData.splice(req.params.idx, 1)

    // save the new creatures to the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    res.redirect('/creatures')
})

module.exports = router

