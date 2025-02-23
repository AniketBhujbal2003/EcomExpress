const Cart = require("../../models/Cart");
const Product = require("../../models/Product");


const addToCart = async (req, res) => {

    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Inavlid data provided"
                }
            )

        }

        const product = await Product.findById(productId);
        if (!product) {
            console.log('spruha');
            return res.status(404).json(
                {
                    success: false,
                    message: "Product not found"
                }
            )
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart(
                {
                    userId,
                    items: [],
                }
            )
        }

        let findCurrentProductIndex = cart.items.findIndex((item) => {
            return (item.productId.toString() === productId);
        })

        if (findCurrentProductIndex == -1) {
            cart.items.push({ productId, quantity });
        }
        else {
            cart.items[findCurrentProductIndex].quantity += quantity;
        }

        await cart.save();

        res.status(200).json(
            {
                success: true,
                message: 'cart added succesfully',
                data: cart,
            }
        )


    }
    catch (err) {
        console.log('Error from cart-controllers/addToCart : ', err);
        res.status(500).json(
            {
                success: false,
                message: "Error from cart-controllers/addToCart"
            }
        )
    }
}

const fetchCartItems = async (req, res) => {
    try {

        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json(
                {
                    success: false,
                    message: "userId not provided"
                }
            )
        }

        let cart = await Cart.findOne({ userId }).populate(
            {
                path: 'items.productId',
                select: 'image title price salePrice '
            }
        )

        if (!cart) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Cart not found"
                }
            )
        }

        let validItems = cart.items.filter(productItem => productItem.productId);

        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }

        const populateCartItems = validItems.map((item) => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems,
            },
        });

    }
    catch (err) {
        console.log('Error from cart-controllers/fetchCartItem : ', err);
        res.status(500).json(
            {
                success: false,
                message: "Error from cart-controllers/fetchCartItem "
            }
        )
    }
}
const updatateCartItemQuantity = async (req, res) => {
    try {

        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Inavlid data provided"
                }
            )

        }


        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Cart not found"
                }
            )
        }

        let findCurrentProductIndex = cart.items.findIndex((item) => {
            return (item.productId.toString() === productId);
        })

        if (findCurrentProductIndex == -1) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Product not found !"
                }
            )
        }

        cart.items[findCurrentProductIndex].quantity = quantity;

        await cart.save();
        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice",
          });

        const populateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));


        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems,
            },
        });




    }
    catch (err) {
        console.log('Error from cart-controllers/updataCartQuan : ', err);
        res.status(500).json(
            {
                success: false,
                message: "Error from cart-controllers/updataCartQuan"
            }
        )
    }
}

const deleteCartItems = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found!",
            });
        }

        cart.items = cart.items.filter((item) => {
            return item.productId._id.toString() !== productId;
        })

        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        const populateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
              ...cart._doc,
              items: populateCartItems,
            },
          });


    }
    catch (err) {
        console.log('Error from cart-controllers/deleateCartQuantity : ', err);
        res.status(500).json(
            {
                success: false,
                message: 'Error from cart-controllers/deleateCartQuantity : '
            }
        )
    }
}

module.exports = {addToCart,deleteCartItems,fetchCartItems,updatateCartItemQuantity}
