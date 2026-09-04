const mongoose = require("mongoose");
const Course = require("../model/Course");
const Tag = require("../model/Tag");
const RatingAndReview = require("../model/RatingAndReview");
const { uploadImageToCloudinary: uploadImage } = require("../utils/imageUploadToCloudinary");

exports.createCourse = async (req, res) => {
    try {
        const {
            courseName,
            courseDescription,
            instructor,
            whatyouwilllearn,
            courseContent,
            ratingReview,
            price,
            thumbnail,
            tag,
            studentEnrolled,
        } = req.body;

        if (!courseName || !instructor) {
            return res.status(400).json({
                success: false,
                message: "courseName and instructor are required"
            });
        }

        let tagIds = [];
        if (tag) {
            const tagItems = Array.isArray(tag) ? tag : [tag];

            for (const item of tagItems) {
                if (!item) continue;

                let existingTag = null;
                if (mongoose.isValidObjectId(item)) {
                    existingTag = await Tag.findById(item);
                }

                if (!existingTag) {
                    existingTag = await Tag.findOne({ name: item });
                }

                if (!existingTag) {
                    existingTag = await Tag.create({ name: item });
                }

                tagIds.push(existingTag._id);
            }
        }

        let thumbnailUrl = thumbnail;
        if (thumbnail && typeof thumbnail === "string") {
            const isBase64 = thumbnail.startsWith("data:") || thumbnail.includes("base64");
            const isRemoteUrl = /^https?:\/\//i.test(thumbnail);
            if (isBase64 || isRemoteUrl) {
                const uploadResult = await uploadImage(thumbnail, "eduverse_courses");
                thumbnailUrl = uploadResult.secure_url;
            }
        }

        const course = await Course.create({
            courseName,
            courseDescription,
            instructor,
            whatyouwilllearn,
            courseContent,
            ratingReview,
            price,
            thumbnail: thumbnailUrl,
            tag: tagIds,
            studentEnrolled,
        });

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            course,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while creating course",
            error: error.message,
        });
    }
};

exports.createRatingReview = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { user, rating, review } = req.body;
        const reviewerId = user || (req.user && (req.user.id || req.user._id));

        if (!courseId || !reviewerId || rating === undefined) {
            return res.status(400).json({
                success: false,
                message: "courseId, user, and rating are required"
            });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const ratingReview = await RatingAndReview.create({
            user: reviewerId,
            course: courseId,
            rating,
            review,
        });

        course.ratingReview.push(ratingReview._id);
        await course.save();

        return res.status(201).json({
            success: true,
            message: "Rating and review added successfully",
            ratingReview,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while adding rating/review",
            error: error.message,
        });
    }
};