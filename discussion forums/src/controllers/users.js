const { user_dao, topics } = require('../dao/userDao');
const models = require('../../sql_dbs/models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const _ = require('lodash');
const avtar = require('gravatar');
require('dotenv').config();
const salt_rounds = 10;

exports.query_testing = async (req, res) => {
    const results = await topics.getAllQuestions();

    res.json({
        message: 'searched data results',
        data: results
    });
}


exports.loginPage = async (req, res) => {
    return res.render('login');
}
exports.registerPage = async (req, res) => {
    return res.render('register');
}

exports.post_login = async (req, res) => {

    let data = req.body;
    let results = await user_dao.getUserByEmail(data);
    if (!results) {
        res.render('login', { alert: 'no user found with this email' });
    }
    else {
        let check_password = await bcrypt.compare(data.password, results.password);
        if (!check_password) {
            res.render('login', { alert: 'wrong email/password' });
        }
        else {
            const token = sign({ user_id: results.id }, process.env.JWT_KEY);
            req.session.jwt = token;
            req.session.save();
            res.redirect('/home');
        }
    }
}

exports.post_register = async (req, res) => {
    let data = req.body;
    let error = {};
    const results = _.isEqual(data.password, data.r_password);
    if (!results) {
        error.r_password = 'password not matched';
        error.password = 'password not matched'
        res.render('register', { err: error });
    }
    else {
        let user_avtar = avtar.url(data.email, { s: '200', r: 'pg', d: 'mm' })
        let password = bcrypt.hashSync(data.password, salt_rounds);
        let [user, created] = await user_dao.createNewUser(data, password, user_avtar);
        if (created) {
            console.log('user data created>>>> ', created);
            //generate token for registered user
            //then redirected to home route with token
            res.redirect('/home');
        }
        if (user) {
            res.render('register', { alert: 'user exist with this email Id' });
        }
    }
}

exports.logout = async (req, res) => {
    req.session.destroy();
    res.render('login', { alert: 'logout successfully' });
}

exports.home = async (req, res) => {
    if (req.logged_in_userID) {
        const user_data = await user_dao.getUserById(req.logged_in_userID);

        const categories = await topics.getAllCategories();
        const data = await topics.getAllQuestions();
        return res.render('homePage', { categories, user_data, data });
    }
    else {
        return res.redirect('/login');

    }

}
exports.user_profile = async (req, res) => {
    if (req.logged_in_userID) {
        let user_data = await user_dao.getUserById(req.logged_in_userID);
        return res.render('profilePage', { user_data });
    }
    else {
        return res.redirect('/login');
    }
}
exports.user_bookmark = async (req, res) => {
    return res.render('bookmarkPage');
}

exports.save_employment_credentials = async (req, res) => {
    console.log(req.body);

    return res.redirect('/profile');
}

exports.save_education_credentials = async (req, res) => {
    console.log(req.body);

    return res.redirect('/profile');
}

exports.save_location_credentials = async (req, res) => {
    console.log(req.body);

    return res.redirect('/profile');
}

exports.category_wise_data_feed = async (req, res) => {
    const categories = await topics.getAllCategories();
    const user_data = await user_dao.getUserById(req.logged_in_userID);
    const data = await topics.getAllQuestions_by_categoryID(req.params.id);
    console.log(req.logged_in_userID);
    res.render('homePage', { categories, user_data, data });
}

exports.getAllCategories = async (req, res) => {
    const data = await topics.getAllCategories();
    return res.send(data);
}

exports.post_Questions = async (req, res) => {
    const result = await topics.createQuestion(req.body, req.params);
    console.log(req.body, req.params.id);
    console.log(result);
    res.redirect('/home');
}

exports.post_answers = async (req, res) => {
    if (req.logged_in_userID) {
        const q_id = req.params.id;
        const u_id = req.logged_in_userID;
        console.log(q_id, u_id);
        const response = await topics.createAnswers(req.body.answer, q_id, u_id);
        console.log(response);
        res.redirect('/home');
    }
    else {
        res.redirect('/login');
    }

}

exports.question_upvote = async (req, res) => {
    const question_id = req.params.id;
    const u_id = req.logged_in_userID;
    const result = await topics.check_userActions_on_question(u_id, question_id);
    if (result) {
        if (result.action == 'like') {
            const response = await topics.return_action_data(question_id);
            res.send(response);
        }
        if (result.action == 'dislike') {
            const response1 = await topics.update_action_tolike(u_id, question_id);
            const response = await topics.increaseUpvote_decreaseDownvote(question_id);
            res.send(response);
        }
    }
    else {
        const response1 = await topics.create_action_on_question(u_id, question_id, 'like');
        const response = await topics.return_action_data(question_id);
        res.send(response);
    }
}
exports.question_downvote = async (req, res) => {
    const question_id = req.params.id;
    const u_id = req.logged_in_userID;
    const result = await topics.check_userActions_on_question(u_id, question_id);
    if (result) {
        if (result.action == 'dislike') {
            const response = await topics.return_action_data(question_id);
            res.send(response);
        }
        if (result.action == 'like') {
            const response1 = await topics.update_action_toDislike(u_id, question_id);
            const response = await topics.increaseDownvote_decreaseUpvote(question_id);
            res.send(response);
        }
    }
    else {
        const response1 = await topics.create_action_on_question(u_id, question_id, 'dislike');
        const response = await topics.return_action_data(question_id);
        res.send(response);
    }
}

exports.getAllLikesAndDislikes = async (req, res) => {
    const u_id = req.logged_in_userID;
    const response = await topics.getAll_user_actionsBy_ID(u_id);
    res.send(response);
}

exports.answer_upvote = async (req, res) => {
    const answer_id = req.params.id;
    const response = await topics.upvote_answer(answer_id);
    res.send(response);
}

exports.answer_downvote = async (req, res) => {
    const answer_id = req.params.id;
    const response = await topics.downvote_answer(answer_id);
    res.send(response);
}

