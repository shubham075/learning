const dao = require('../dao/dao');

exports.userLogin = async (req, res) => {
    res.render('userLogin');
}

exports.postUserLogin = async (req, res) => {
    let { email, password } = req.body;
    let result = await dao.getUserByEmail(email);
    if (result) {
        if (password === result.password) {
            const token = jwt.sign({ id: result.id }, process.env.JWT_KEY);
            req.session.jwt = token;
            req.session.save();
            res.redirect('/category');
        }
        else {
            res.render('userLogin', { alert: 'entered worng email id or password' });
        }
    }
    else {
        res.render('userLogin', { alert: 'entered worng email id or password' });
    }
}

exports.userRegister = async (req, res) => {
    res.render('userRegister');
}

exports.postUserRegister = async (req, res) => {
    let data = req.body;
    let result = await dao.getUserByEmail(data.email);
    if (!result) {
        if (data.password === data.confirmPassword) {
            let results = await dao.createNewUser(data);
            if (results) {
                res.render('userLogin', { alert: 'Register successfully! Login with your credentials' });
            }
            else {
                res.json({ message: 'Error in creating user' });
            }
        }
        else {
            res.render('userRegister', { alert: 'Password and confirm password not matched!' });
        }
    }
    else {
        res.render('userRegister', { alert: 'User email ID exist, please login with that email!' });
    }
}

// view all category
exports.viewCategory = async (req, res) => {
    let data = await dao.getAllCategories();
    res.render('categoryView', { data });
    // res.json({data:data})
}

exports.viewProducts = async (req, res) => {
    let id = req.params.categoryID;
    let data = await dao.getAllProductsBy_categoryID(id);
    if (data.length > 0) {
        res.render('productView', { data });
        // res.json({data:data});
    }
    else {
        res.json({
            message: 'No any products in this catgeory!'
        })
    }
}

exports.viewSingleProductData = async (req, res) => {
    let id = req.params.productID;
    let data = await dao.getProductWithDataBy_productID(id);
    res.render('product', { data });
    // res.json({data:data});
}

exports.getProduct_dataByID = async (req, res) => {
    let ID = req.params.product_dataID;
    let p_data = await dao.getProduct_dataByID(ID);
    // console.log('productData from controller :',p_data);
    res.send(p_data);
}

exports.add_to_cart_data = async (req, res) => {
    let customerID = req.loggedInUser;
    let { selected_product } = req.body;

    try {
        if (!req.loggedInUser) {
            console.log('no login data found');
            res.redirect('/login',{alert:'please login first!'});
        }
        else {
            if (!selected_product) {
                console.log('req.body not found!');
                res.render('')
            }
            else {
                console.log('customer login data found');
                console.log('logged in user ID :', req.loggedInUser);
                let result = await dao.create_cart_data(selected_product, customerID);
                if (!result) {
                    console.log('error while adding to cart')
                }
                else {
                    console.log(result);
                    console.log('product added to cart');
                }
            }
        }
    } catch (error) {
        console.error()
    }

}