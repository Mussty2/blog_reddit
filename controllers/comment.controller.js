import Comment from "../models/comment.model.js";

//add comment
export const addComment = async(req, res)=>{
   try {
     const comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.params.id
    });

    res.status(201).json({ success: true, message: "comment added", data: comment})
   } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
   }
}

export const getComments = async(req, res)=>{
    const comments = await Comment.find({ post: req.params.id }).populate("user", "name").sort({ createdAt: -1 })

    res.json({ success: true, data: comments})
}

export const deleteComment = async(req, res)=>{
    const comment = await Comment.find(req.params.id)

    if(!comment) return res.status(404).json({ message: "Not found" })

        await comment.deleteOne()

    res.json({ success: true, message: "comment deleted"})
}

