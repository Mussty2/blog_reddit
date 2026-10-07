import  mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    // image: { type: String, public_id: String},
    image: {
        url: {type: String, default: null},
        public_id: { type: String, default: null}
    },
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    dislikes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
   
}, { timestamps: true });

 const Post = mongoose.model('Post', postSchema)
export default Post