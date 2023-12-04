const { Op } = require('sequelize');
const models = require('../../sql_dbs/models');

const user_dao = {
    getUserByEmail: async (data) => {
        return models.users.findOne({
            where: {
                email: data.email
            }
        });
    },
    createNewUser: async (data, data_one, data_two) => {
        return models.users.findOrCreate({
            where: {
                email: data.email
            },
            defaults: {
                name: data.username,
                email: data.email,
                password: data_one,
                avtarImage: data_two
            }
        })
    },
    getUserById: async (data) => {
        return models.users.findOne({
            where: {
                id: data
            }
        });
    },
    addUserEmploymentCredentialsData: async (attr1, attr2) => {
        return models.user_employment_credentials_data.create({
            position: attr2.position,
            company: attr2.company_name,
            start_year: attr2.start_year,
            end_year: attr2.end_year,
            isWorking_here: attr2.is_currently_work_here,
            userID: attr2,
        });

    }
}

const topics = {
    getAllCategories: async () => {
        return models.categories.findAll();
    },

    getAllQuestions: async () => {
        return models.questions.findAll({
            include: [
                { model: models.users },
                { model: models.answers, as: 'questionAnswer', include: [{ model: models.users }] }
            ]
        });
    },
    getAllQuestions_by_categoryID: async (attr) => {
        return models.questions.findAll({
            where: {
                categoryID: attr
            },
            include: [
                { model: models.users },
                { model: models.answers, as: 'questionAnswer', include: [{ model: models.users }] }
            ]
        })
    },
    createQuestion: async (attr1, attr2) => {
        models.categories.increment('feed_count', { by: 1, where: { id: attr1.category_select } });
        return models.questions.create({
            question: attr1.question,
            categoryID: attr1.category_select,
            userID: attr2.id
        });

    },
    upvote_question: async (attr1) => {
        models.questions.increment('upvote', { by: 1, where: { id: attr1 } });
        return models.questions.findOne({
            where: {
                id: attr1
            },
            attributes: ['upvote']
        })
    },

    return_action_data: async (attr1) => {
        return models.questions.findOne({
            where: {
                id: attr1
            },
            attributes: ['upvote', 'downvote']
        })
    },

    downvote_question: async (attr1) => {
        models.questions.increment('downvote', { by: 1, where: { id: attr1 } });
        return models.questions.findOne({
            where: {
                id: attr1
            },
            attributes: ['downvote']
        });
    },
    upvote_answer: async (attr) => {
        models.answers.increment('upvote', { by: 1, where: { id: attr } });
        return models.answers.findOne({
            where: {
                id: attr
            },
            attributes: ['upvote']
        });
    },
    downvote_answer: async (attr) => {
        models.answers.increment('downvote', { by: 1, where: { id: attr } });
        return models.answers.findOne({
            where: {
                id: attr
            }, attributes: ['downvote']
        });
    },
    createAnswers: async (attr1, attr2, attr3) => {
        return models.answers.create({
            answer: attr1,
            questionID: attr2,
            userID: attr3,
            upvote: 0,
            downvote: 0
        });
    },
    check_userActions_on_question: async (attr1, attr2) => {
        return models.useraction_on_questions.findOne({
            where: {
                [Op.and]: [{ userID: attr1 }, { questionID: attr2 }]
            }
        });
    },
    getAll_user_actionsBy_ID: async (attr) => {
        return models.useraction_on_questions.findAll({
            where: {
                userID: attr
            }
        })
    },
    create_action_on_question: async (attr1, attr2, attr3) => {
        return models.useraction_on_questions.create({
            userID: attr1,
            questionID: attr2,
            action: attr3
        })
    },
    update_action_tolike: async (attr1, attr2) => {
        return models.useraction_on_questions.update(
            { action: 'like' },
            {
                where: {
                    [Op.and]: [{ userID: attr1 }, { questionID: attr2 }]
                }
            }
        )
    },
    update_action_toDislike: async (attr1, attr2) => {
        return models.useraction_on_questions.update(
            { action: 'dislike' },
            {
                where: {
                    [Op.and]: [{ userID: attr1 }, { questionID: attr2 }]
                }
            }
        )
    },

    increaseUpvote_decreaseDownvote: async (attr1) => {
        await models.questions.increment('upvote', { by: 1, where: { id: attr1 } });
        await models.questions.decrement('downvote', { by: 1, where: { id: attr1 } });
        return models.questions.findOne({
            where: {
                id: attr1
            },
            attributes: ['upvote', 'downvote']
        });
    },

    increaseDownvote_decreaseUpvote: async (attr1) => {
        await models.questions.increment('downvote', { by: 1, where: { id: attr1 } });
        await models.questions.decrement('upvote', { by: 1, where: { id: attr1 } });
        return models.questions.findOne({
            where: {
                id: attr1
            },
            attributes: ['upvote', 'downvote']
        });
    }

}



module.exports = { user_dao, topics }