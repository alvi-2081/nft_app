const { product } = require('../model/product')
const { users } = require('../model/user')
require("dotenv").config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


//Sign In
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }
        const user = await users.findOne({ email: email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ _id: user._id, email: user.email, phone_number: user.phone_number },
                process.env.TOKEN_KEY, {
                expiresIn: "24h",
            }
            );
            var tokens = token;
            let helperfunction = () => {
                let response = res.statusCode;
                let messages = "Login Successful";
                let status = true;
                let data = {
                    id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    phone_number: user.phone_number,
                    tokens
                };
                return res.status(200).send({ response: response, message: messages, status: status, data: data })
            }
            helperfunction()
        } else {
            return res.status(400).send({ response: 400, message: "Invalid Credentials", status: false })
        }

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message)
    }
}


//create user
const signUp = async (req, res) => {
    try {
        const adduser = new users(req.body)
        var encryptedPassword = await bcrypt.hash(adduser.password, 10);
        adduser.password = encryptedPassword;
        const insertuser = await adduser.save();
        const token = jwt.sign({ email: adduser.email, _id: adduser._id, phone_number: adduser.phone_number },
            process.env.TOKEN_KEY, {
            expiresIn: "24h",
        }
        );
        var tokens = token;
        let helperfunction = () => {
            let response = res.statusCode;
            let messages = "Sign-up Successful";
            let status = true;
            let data = {
                id: insertuser._id,
                first_name: insertuser.first_name,
                last_name: insertuser.last_name,
                email: insertuser.email,
                phone_number: insertuser.phone_number,
                tokens
            };
            return res.status(200).send({ response: response, message: messages, status: status, data: data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

//get all product
const allproduct = async (req, res) => {
    try {
        const allprod = await product.find({})
        res.send(allprod)
    } catch (e) {
        console.log(e)
        res.send(e)
    }
}

//single product
const singleproduct = async (req, res) => {
    try {
        const _id = req.query.id
        const singleprod = await product.findOne({ _id })
        res.send(singleprod)

    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }
}


//insert a product
const addproduct = async (req, res) => {
    try {
        const addprod = new product({
            productname: req.body.productname,
            price: req.body.price,
            status: req.body.status,
            owner_id: req.user._id,
            image: req.user.image
        })
        let insertprod = await addprod.save();
        res.status(200).send({ response: res.statusCode, message: "Nft Added Successfully", status: true, data: insertprod })
        // "https://stormy-turtleneck-bat.cyclic.app/" + req.file.path
        // res.send(insertprod)
    } catch (e) {
        res.status(400).send({ response: res.statusCode, message: "Nft not Added", status: false })
        // res.send(e)
        console.log(e)
    }
}



//delete product
const deleteproduct = async (req, res) => {
    try {
        let _id = req.query.id
        const getstdspe = await product.findByIdAndDelete(_id)
        res.send("Delete Successfully")
    } catch (e) {
        console.log(e)
        res.send(e)
    }
}

//update a product
const updateproduct = async (req, res) => {
    try {
        let _id = req.query.id
        const getstdspe = await product.findByIdAndUpdate(_id, req.body, {
            new: true //new updated value usi waqt mil jae uskay liye kia hay

        })
        res.send(getstdspe)
    } catch (e) {
        console.log(e)
        res.send(e)
    }
}





//changeOwner
const changeOwner = async (req, res) => {
    try {
        const changeowner = await product.findByIdAndUpdate({ _id: req.body.imageId }, { owner_id: req.user._id }, { new: true })
        res.status(200).send({ response: res.statusCode, message: "Payment Sucessfully Done", status: true })
    } catch (e) {
        console.log(e)
        res.status(400).send(e.message);
    }
}

//ownerImages
const ownerImages = async (req, res) => {
    try {
        const ownerimages = await product.find({ owner_id: req.user._id })
        res.status(200).send(ownerimages)
    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }
}


module.exports = { ownerImages, changeOwner, singleproduct, signUp, signIn, addproduct, allproduct, deleteproduct, updateproduct }


