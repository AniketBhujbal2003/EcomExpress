
const Address = require("../../models/Address")

const addAddress = async (req,res)=>{
    try{
        const {userId,address,city,pincode,phone,notes} = req.body;
         
        if(!userId || !address || !city || !pincode || !phone || !notes){
            return res.status(400).json(
                {
                    success : false,
                    message:"Invalid data provided",
                }
            )
        }

        const newlyCreatedAddress = new Address(
            {
                userId,address,city,pincode,phone,notes
            }
        )

        await newlyCreatedAddress.save();


        res.status(200).json(
            {
                success:true,
                message:"Address saved successfully",
                data: newlyCreatedAddress,
            }
        )
    }
    catch(err){
        console.log("Error from addAddress controller: ",err);
        res.status(500).json(
            {
                success : false,
                message: "Error from addAddress Controller"
            }
        )
    }
}

const fetchAllAddress = async (req,res)=>{
    try{
       const {userId} = req.params;
       if(!userId){
        return res.status(400).json(
            {
                success:false,
                message:"UserId is required",
            }
        )
       }

       let addressList = await Address.find({userId})

       res.status(200).json(
        {
            success:true,
            data: addressList,
        }
       )
    }
    catch(err){
        console.log("Error from fetchAllAddress controller: ",err);
        res.status(500).json(
            {
                success : false,
                message: "Error from fetchAllAddress Controller"
            }
        )
    }
}

const editAddress = async (req,res)=>{
    try{
        const {userId,addressId} = req.params;
        const formdata = req.body;

        if(!userId || !addressId){
            return res.status(400).json(
                {
                    success:false,
                    message:"UserId and addressId is required",
                }
            )
        }

        let editedAddress = await Address.findOneAndUpdate(
            {
                _id: addressId,
                userId: userId
            },
            formdata,
            {
                new:true,
            }
        )

        if(!editedAddress){
            return res.status(404).json(
                {
                    success:false,
                    message:"address is not found",
                }
            )
        }

        res.status(200).json(
            {
                success:true,
                message:"Address updated successfully",
                data: editedAddress,
            }
        )

    }
    catch(err){
        console.log("Error from editAddress  controller: ",err);
        res.status(500).json(
            {
                success : false,
                message: "Error from editAddress Controller"
            }
        )
    }
}


const deleteAddress = async (req,res)=>{

    try{
        const {userId,addressId} = req.params;

        if(!userId || !addressId){
            return res.status(400).json(
                {
                    success:false,
                    message:"UserId and addressId is required",
                }
            )
        }

        let address = await Address.findOneAndDelete(
            {
                _id: addressId,
                userId: userId,
            }
        )

        if(!address){
            return res.status(404).json(
                {
                    success:false,
                    message:"address is not found",
                }
            )
        }

        res.status(200).json(
            {
                success:true,
                message:"Address deleted successfully",
            }
        )

    }
    catch(err){
        console.log("Error from deleteAddress controller: ",err);
        res.status(500).json(
            {
                success : false,
                message: "Error from deleteAddress Controller"
            }
        )
    }
}

module.exports =  {addAddress,fetchAllAddress,deleteAddress,editAddress};