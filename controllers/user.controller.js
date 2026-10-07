import User  from "../models/user.model.js";

export const addUser = async (req, res)=>{
    const  { first_name, last_name, email, password, age, date_of_birth, gender } = req.body;

    const  existingUser = await User.findOne({ email });
    if(existingUser){
        return res.status(400).json({ message: "User with this email already exists" });
    }
    if(age < 18){
        return res.status(400).json({ message: "User must be at least 18 years old" });
    }
    if(password.length < 6){
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const newUser = new User({
        first_name,
        last_name,
        email,
        password,
        age,
        date_of_birth,
        gender
    });

    try {
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating user, ",error:  error.message });
    }
}

export const getAll = async(req,res)=>{
    const users = await User.find();
    if(users.length === 0){
        return res.status(400).json({ success: false, message: "No user available"})
    }
    res.json({
        success: true,
        total: users.length,
        data: users
    })
}