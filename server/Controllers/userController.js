import User from "../Models/User.js";

export const register = async (req, res) => {
  const { email } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({ error: "User already Registered" });
    const newUser = new User({ email });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json(error);
  }
};



export const updateUser=async(req,res)=>{
  const {id}=req.params;
  const updateData=req.body;
  try {
    const updatedUser=await User.findByIdAndUpdate(id,updateData,{new:true});
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
}

export const bookVisit = async (req, res) => {
  const  { id } = req.params;
  const {email,date}=req.body

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("User not found.");
    }
    const alreadyBooked=user.bookedVisists.find(visit=>visit.id===id);
    if(alreadyBooked)
    {
      return res.status(400).send("Visit already booked for this date.");
    }
    const newVisit={id,date};
    user.bookedVisists.push(newVisit);
    const updatedVisit = await user.save();
    res
      .status(201)
      .json({ message: "Visit booked successfully.",bookedVisists: updatedVisit });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllBooking=async(req,res)=>{
  const {email}=req.query;
  try {
     const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.status(200).json(user.bookedVisists);
  } catch (error) {
    res.status(500).json(error);
  }
}

export const cancelBooking=async(req,res)=>{
  const { bookingId } = req.params;
  const {email}=req.body;
  try {
    const updatedUser=await User.findOneAndUpdate(
      {email:email},
      {$pull:{bookedVisists:{id:bookingId}}},
      {new:true})
  if (!updatedUser) {
    return res.status(404).json({ message: "User not found or booking does not exist." });
  }
  res.status(200).json({ message: "Booking canceled successfully.", user: updatedUser }); 
  } catch (error) {
    res.status(500).json(error);
  }
}

export const addFav=async(req,res)=>{
  const {email}=req.body;
  const {propertyId}=req.params;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $addToSet: { favResidenciesId: propertyId } },
      { new: true }
    );    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({message: "Property added to favorites successfully.",user: updatedUser,});  
  } catch (error) {
    res.status(500).json(error);
  }
}

export const removeFav=async(req,res)=>{
  const {email}=req.body;
  const {propertyId}=req.params;

  try {
    const updatedUser=await  User.findOneAndUpdate(
      {email:email},
      {$pull:{favResidenciesId:propertyId}},
      {new:true})

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      res.status(200).json({message: "Property removed from favorites successfully.",user: updatedUser,});
  } catch (error) {
     res.status(500).json(error);
  }
}

export const getAllFavorites=async(req,res)=>{
  const {email}=req.query;
  try {
    const user=await User.findOne({email:email})
    if(!user)
    {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user.favResidenciesId)
  } catch (error) {
    res.status(500).json(error);
  }
}