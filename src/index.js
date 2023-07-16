const express = require('express');
const cors = require('cors')

// importing turf module for intersection calculations
const turf = require('@turf/turf');

// importing middleware for header based auth
const authenticate = require('./middlewares/authenticate')

// importing util function for finding intersection points
const calculateIntersectionPoints = require('./utils/calculateIntersectionPoints')

const app = express()

// enabling cors
app.use(cors())

// setting path for serving static files
app.use(express.static('public'))

// Adjust the limit option to handle larger payloads (e.g., 10mb)
app.use(express.json({ limit: '10mb' }))

// post route to find intersection point of given lines with the long lineString
app.post('/findIntersections', authenticate, (req, res) => {

    // Destructuring request object
    let { longLineString, randomLinesOnPlane } = req.body

    // Sending a bad response status in case the required objects are not present
    if (!longLineString || !randomLinesOnPlane) res.sendStatus(400)

    try {
        // parsing the coordinates of the input objects to create lineStrings
        longLineString = turf.lineString(req.body.longLineString.coordinates)
        randomLinesOnPlane = req.body.randomLinesOnPlane.map((lineString) => turf.lineString(lineString.line.coordinates))

        // calling the function to find intersection points
        const intersections = calculateIntersectionPoints(longLineString, randomLinesOnPlane)
        res.send(intersections);

    } catch (e) {

        console.log(error, e)

        // sending response status as 500 in case of any errors
        res.sendStatus(500)
    }


});

module.exports = app