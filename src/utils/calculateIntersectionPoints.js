const turf = require('@turf/turf');

/**
 * @summary Middleware to log request details.
 * @param {object} longLineString - a really long linestring with (5k points)
 * @param {object} randomLinesOnPlane - a set of 50 randomly spread lines
 * @returns {Array} 
 */
const calculateIntersectionPoints = (longLineString, randomLinesOnPlane) => {

    // array to store the intersection points
    const intersections = [];
    randomLinesOnPlane.forEach((lineString, idx) => {
        const intersection = turf.lineIntersect(longLineString, lineString);
        if (intersection.features.length > 0) {
            intersections.push({ lineId: idx + 1, intersectionPoint: intersection.geometry.coordinates });
        }
    });

    return intersections
}

module.exports = calculateIntersectionPoints