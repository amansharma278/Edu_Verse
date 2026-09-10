const express = require('express');
const router = express.Router();

const { createCourse, createRatingReview, uploadCourseMedia, getInstructorCourses, getCourseForEdit, updateCourse, deleteCourse } = require('../controllers/course');
const { auth, isInstructor } = require('../middlewares/auth');

router.post('/course/media', auth, isInstructor, uploadCourseMedia);
router.post('/course', auth, isInstructor, createCourse);
router.get('/course/instructor', auth, isInstructor, getInstructorCourses);
router.get('/course/:courseId', auth, isInstructor, getCourseForEdit);
router.put('/course/:courseId', auth, isInstructor, updateCourse);
router.delete('/course/:courseId', auth, isInstructor, deleteCourse);
router.post('/course/:courseId/review', createRatingReview);

module.exports = router;
