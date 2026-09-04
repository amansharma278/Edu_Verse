const express = require('express');
const router = express.Router();

const { createCourse, createRatingReview } = require('../controllers/course');

router.post('/course', createCourse);
router.post('/course/:courseId/review', createRatingReview);

module.exports = router;
