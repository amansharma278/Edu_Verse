const mongoose = require("mongoose");
const Course = require("../model/Course");
const Tag = require("../model/Tag");
const RatingAndReview = require("../model/RatingAndReview");
const Section = require("../model/Section");
const SubSection = require("../model/SubSection");
const { uploadImageToCloudinary: uploadImage } = require("../utils/imageUploadToCloudinary");

exports.uploadCourseMedia = async (req, res) => {
    try {
        const { file, kind } = req.body;
        if (!file || typeof file !== "string") {
            return res.status(400).json({ success: false, message: "Media file is required" });
        }

        const resourceType = kind === "video" ? "video" : "image";
        const folder = kind === "video" ? "eduverse_course_videos" : "eduverse_courses";
        const uploadResult = await uploadImage(file, folder, undefined, undefined, resourceType);

        return res.status(201).json({
            success: true,
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
            resourceType,
        });
    } catch (error) {
        console.log("Error while uploading course media", error);
        return res.status(500).json({
            success: false,
            message: "Error while uploading course media",
            error: error.message,
        });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const {
            courseName,
            courseDescription,
            instructor,
            whatyouwilllearn,
            ratingReview,
            price,
            thumbnail,
            tag,
            studentEnrolled,
            sections,
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

        const thumbnailUrl = thumbnail;
        let courseContent;

        if (Array.isArray(sections) && sections.length > 0) {
            const sectionDocuments = [];
            for (const section of sections) {
                const subsectionIds = [];
                for (const lecture of section.lectures || []) {
                    const subsection = await SubSection.create({
                        title: lecture.title,
                        videoUrl: lecture.videoUrl,
                    });
                    subsectionIds.push(subsection._id);
                }
                sectionDocuments.push(await Section.create({
                    sectionName: section.title,
                    subSection: subsectionIds,
                }));
            }
            courseContent = sectionDocuments[0]?._id;
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

exports.getInstructorCourses = async (req, res) => {
    try {
        const courses = await Course.find({ instructor: req.user.id })
            .populate("ratingReview")
            .sort({ _id: -1 });

        return res.status(200).json({
            success: true,
            courses,
        });
    } catch (error) {
        console.log("Error while fetching instructor courses", error);
        return res.status(500).json({
            success: false,
            message: "Error while fetching instructor courses",
            error: error.message,
        });
    }
};

exports.createRatingReview = async (req, res) => {
    try {
        const { courseId } = req.params;
        // Get user ID from request body or authenticated user
        const { user, rating, review } = req.body;
        // Use the authenticated user's ID if not provided in the request body
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