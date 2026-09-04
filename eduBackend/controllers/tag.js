const Tag = require('../model/Tag');

exports.creatTag = async (req, res) => {
    try {
        const { name, description, course } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Tag name & descripton is required"
            });
        }

        const existingTag = await Tag.findOne({ name });
        if (existingTag) {
            return res.status(409).json({
                success: false,
                message: "Tag with this name already exists"
            });
        }

        const tag = await Tag.create({
            name,
            description,
            course
        });

        return res.status(201).json({
            success: true,
            message: "Tag created successfully",
            tag
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Error while creating tag",
            error: error.message
        });
    }
};

exports.showAllTag=async(req, res) =>{
    try{

        const alltags = await Tag.find({}, {name:true, description:true})

        if(!alltags){
            return res.status(409).json({
                success:false,
                message:"There is no tag with this name"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Successfully find the tag",
            alltags
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}