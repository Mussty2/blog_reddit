import Post from "../models/post.model.js";

//CREATE POST
export const createPost = async (req, res)=>{
    try {
        const { title, content } = req.body;

        const post = await Post.create({
            title,
            content,
            image: req.file ?
             { 
                url: req.file.path,
                public_id: req.file.filename
            } : null,
            author: req.user._id
        })
        res.status(201).json({
            success: true,
            data: post
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


export const getAll = async (req, res)=>{
    try {
       const posts = await Post.find().populate("author", "firstname lastname email").sort({ createdAt: -1 });
       const total = posts?.length
       res.json({
        total: total,
        success: true,
        data: posts
       })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getSinglePost = async (req, res)=>{
    try {
       const post = await Post.findById(req.params.id).populate("author", "name");

       if(!post) return res.status(404).json({ success: false, message: "Post not found"});

       res.json({
        success: true,
        data: post
       })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const deletePost = async (req, res)=>{
    try {
       const post = await Post.findById(req.params.id);

       if(!post) return res.status(404).json({ success: false, message: "Post not found"});

       //ensure ownership
       if(post.author.toString() !== req.user._id.toString()) 
       return res.status(403).json({ 
         success: false, 
         message: "Not authorized to delete this post"
         })
        await post.deleteOne();

       res.json({ success:true, message: "Post deleted successfully"})
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// export const delete2 = async (req, res)=>{
//     try {
//        const post = await Post.findOneAndDelete({
//         _id: req.params.id,
//         user: req.user._id,
//        });
//        if(!post) return res.status(404).json({ success: false, message: "Post not found or not authorized"});

//        res.json({ success:true, message: "Post deleted successfully"})
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

export const updatePost = async (req, res)=>{
    try {
       const post = await Post.findById(req.params.id);

       if(!post) return res.status(404).json({ success: false, message: "Post not found"});

        if(post.author.toString() !== req.user._id.toString())
            return res.status(403).json({ 
            success: false, 
            message: "Not authorized to update this post"
         })

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;

        const updatedPost = await post.save()

   res.json({
       success:true,
        message: "Post updated  successfully",
        data: updatedPost

   })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const likePost = async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);

          if (!post) return res.status(404).json({ message: "Post not found" });

          const userId = req.user._id;

          post.dislikes = post.dislikes.filter((id) => id.toString() !== userId.toString());

          if (post.likes.includes(userId)){
            post.likes = post.likes.filter((id) => id.toString() !== userId.toString())
          }else{
            post.likes.push(userId);
          }

          await post.save()

          res.json({ success: true,  message: "Liked a post🥳🥳🍾"})

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const dislikePost = async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);

          if (!post) return res.status(404).json({ message: "Post not found" });

          const userId = req.user._id;

          post.likes = post.likes.filter((id) => id.toString() !== userId.toString());

          if (post.dislikes.includes(userId)){
            post.dislikes = post.dislikes.filter((id) => id.toString() !== userId.toString())
          }else{
            post.dislikes.push(userId);
          }

          await post.save()

          res.json({ success: true,  message: "dislked a post🥳🥳🍾"})

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}