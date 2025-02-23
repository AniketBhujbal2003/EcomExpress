const Product = require("../../models/Product")

const getFillteredProducts = async (req, res) => {
    try {

        const { category, brand, sortBy = 'price-lowtohigh' } = req.query;

        // console.log("q:", req.query);

        // console.log(category, brand, sortBy);

        let filters = {};
        if (category && category.length) {
            filters.category = { $in: category.split(',') };
        }

        if (brand && brand.length) {
            filters.brand = { $in: brand.split(',') };
        }

        let sort = {};

        switch (sortBy) {
            case 'price-lowtohigh':
                sort.price = 1;
                break;
            case 'price-hightolow':
                sort.price = -1;
                break;
            case 'price-atoz':
                sort.title = 1;
                break;
            case 'price-ztoa':
                sort.title = -1;
                break;
            default:
                sort.price = 1;

        }

        const products = await Product.find(filters).sort(sort);

        res.status(200).json(
            {
                success: true,
                message: "Data obtained succesfully",
                data: products,
            }
        )
    }
    catch (err) {
        console.log("Error from shop/product-controler/getFillteredProduct : ", err);
        res.status(500).json({
            success: false,
            message: "Error from shop/product-controler/getFillteredProduct",
        })
    }
}


const getProductDetails = async (req, res) => {

     try{

        const {id} = req.params;
        let product = await Product.findById(id);

        if(!product){
            console.log("Error from shop/product-controler/getProductDetails : ", err);
            res.status(500).json({
                success: false,
                message: "Product not found ",
            })
        }

        res.status(200).json(
            {
                success: true,
                message: "Product find succesfully",
                data: product,
            }
        )
         
     }
     catch(err){
        console.log("Error from shop/product-controler/getProductDetails : ", err);
        res.status(500).json({
            success: false,
            message: "Error from shop/product-controler/getProductDetails",
        })
     }
}

module.exports = { getFillteredProducts , getProductDetails}