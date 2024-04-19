import Property from "../Models/Property.js";
export const createProperty=async(req,res)=>{
    try {
        const property=new Property(req.body);
        const savedProperty = await property.save();
        res.status(201).json(savedProperty);
    } catch (error) {
        res.status(500).json(error);
    }    
}

export const getAllProperties=async(req,res)=>{
    try {
        const property = await Property.find().sort({ _id: -1 });
        res.status(201).json(property)
    } catch (error) {
        res.status(500).json({message: error});
    }
}

// export const getAllProperties = async (req, res) => {
//     const page=parseInt(req.query.page)||1;
//     const limit=parseInt(req.query.limit)||10;
//     const skip=(page-1)*limit;
//   try {
//     const property = await Property.find().sort({ _id: -1 }).skip(skip).limit(limit);
//     const total=await Property.countDocuments();
//     const totalPages=Math.ceil(total/limit);
//     res.status(201).json({property,totalPages,currentPage:page,totalItems:total});
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

export const getProperty=async(req,res)=>{
    const {propId} = req.params;
    if (!propId ) return res.status(400).send("Invalid id");
    try {
        const property = await Property.findById(propId);
        if (!property) {
          return res.status(404).send("Property not found");
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const  updateProperty=async(req,res)=> {
    const {id}=req.params;
    const updateData=req.body;

    try {
        const updatedProperty=await Property.findByIdAndUpdate(id,updateData,{ new: true})
        if (!updatedProperty) {
          return res.status(404).json({ message: "Property not found." });
        }
        res.status(200).json(updatedProperty);
    } catch (error) {
         res.status(500).json({ message: error });
    }
}

export const deleteProperty=async(req,res)=>{
    const {id}=req.params;
    try {
        const deletedProperty=await Property.findByIdAndDelete(id);
        if (!deletedProperty) {
          return res.status(404).json({ message: "Property not found." });
        }
        res.status(200).json({ message: "Property successfully deleted." });
    } catch (error) {
         res.status(500).json({ message: error });
    }
}

export const getRandom=async(req,res)=>{
    try {
            const randomProperty=await Property.aggregate([{$sample:{size:10}}])
            res.status(200).json(randomProperty);
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: error });   
    }
}