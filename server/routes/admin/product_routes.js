const express = require('express');
const router = express.Router();

const { upload } = require('../../helpers/cloudinary');

const {
    handleImageUpload,
    deleteProduct,
    editProduct,
    fetchAllProducts,
    addProduct
} = require("../../controlers/admin/product_Controllers");




router.route('/upload-image').post(upload.single('my_file'), handleImageUpload);


router.route("/add").post(addProduct);
router.route("/delete/:id").delete(deleteProduct);
router.route("/edit/:id").put(editProduct);

router.route('/get').get(fetchAllProducts);


module.exports = router;