
const { imageUploadUtil } = require('../../helpers/cloudinary');
const Product = require('../../models/Product');

// handle Image upload

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};


// add new Products

const addProduct = async (req, res) => {

  try {

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview
    } = req.body;

    const newProduct = new Product(
      {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        averageReview
      }
    );

    console.log(newProduct);

    await newProduct.save();

    res.status(201).json({
      success: true,
      data: newProduct,
      message: "New Product Created Succesfully",
    })

  }
  catch (err) {
    console.log("Error from addProduct Controler: ", err);
    res.json({
      success: false,
      message: "Error from addProduct Controler",
    });
  }
}

// fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      message: "All Products fetch successfully",
      data: listOfProducts,
    })
  }
  catch (err) {
    console.log("Error from addProduct Controler: ", err);
    res.json({
      success: false,
      message: "Error from addProduct Controler",
    });
  }
}

//edit a product 
const editProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview
    } = req.body;

    const findProduct = await Product.findById(id);

    console.log(findProduct);
    

  
    if(!findProduct){
       return res.status(404).json(
        {
          success:false,
          message:"Product Not Found",
        }
       )
    }
   
    console.log(title);
    
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.averageReview = averageReview || findProduct.averageReview;
    
    await findProduct.save();

    let p = await Product.findById(id);
    console.log(p);

    res.status(200).json({
      success:true,
      message:"Product Edited Succesfully ",
      data: findProduct,
    })

  }
  catch (err) {
    console.log("Error from addProduct Controler: ", err);
    res.json({
      success: false,
      message: "Error from addProduct Controler",
    });
  }
}

// delete a product
const deleteProduct = async (req, res) => {
  try {
      const {id} = req.params;
      const getProduct = await Product.findByIdAndDelete(id);
      console.log(getProduct);

      if(!getProduct){
        return res.status(404).json(
          {
            success:false,
            message:"Product Not Found",
          }
         )
      }

      res.status(200).json(
        {
          success:true,
          message: "Product Delete Succesfully",
        }
      )
  }
  catch (err) {
    console.log("Error from deleteProduct Controler: ", err);
    res.json({
      success: false,
      message: "Error from deleteProduct Controler",
    });
  }
}

module.exports = { handleImageUpload, addProduct, fetchAllProducts, deleteProduct, editProduct }