const router = require('express').Router()
const {GiantPlaylist} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const playlist = await GiantPlaylist.findAll({
            attributes: ['spotifyId']
        })
        res.status(200).json(playlist)
      } catch(err) {next(err)}
  })

router.post('/', async (req, res, next) => {
    try {
        const playlist = await GiantPlaylist.create({image: req.body.image, spotifyId: req.body.spotifyId})

        res.status(200).json(playlist)
      } catch(err) {next(err)}
  })

router.put('/', async (req, res, next) => {
    try {
      console.log('B O D Y **** *', req.body)
      const track = await GiantPlaylist.update({mood: req.body.mood}, {where: {spotifyId: req.body.spotifyId }})
      res.status(200).json(track)
    } catch (err) {next(err)}
})