import User from "../models/user.model.js"
import Post from "../models/post.model.js"

//Block user

export const blockUser = async(req, res)=>{
  const user = await User.findById(req.params.id);

  if(!user) return res.status(404).json({ message: "user not found"})

    user.isBlock = true;
    await user.save();

    res.json({ message: "User blocked" })
}

export const unblockUser = async(req, res)=>{
    const user = await User.findById(req.params.id);

  if(!user) return res.status(404).json({ message: "user not found"})

    user.isBlock = false;
    await user.save();

    res.json({ message: "User unblocked" })
}

export const adminDeletePost = async(req, res)=>{
      const post = await Post.findById(req.params.id);

  if(!post) return res.status(404).json({ message: "Post not found"})


    await post.deleteOne();

    res.json({ message: "Post deleted" })
}