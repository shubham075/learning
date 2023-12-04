const { userDao } = require('../dao/common_dao');


const chat_services = {

    getUserById: async (id) => {
        try {
            return await userDao.getUserById(id);
        } catch (error) {
            console.error(error);
        }
    },

    updateOnlineStatus: async (id) => {
        try {
            return await userDao.updateStatusToOnline(id);
        } catch (error) {
            console.error(error);
        }
    },

    updateofflineStatus: async (id) => {
        try {
            return await userDao.updateStatusToOffline(id);
        } catch (error) {
            console.error(error);
        }
    },

    getAllUsers_UnreadMessages: async (id) => {
        try {
            const response = await userDao.getAllUsers_unreadMessages(id);
            console.log('inside chat_services:::::', response);
        } catch (error) {
            console.error(error);
        }
    },

    getUsersPrevMessages: async (roomId) => {
        try {
            return await userDao.getUser_messages(roomId);
        } catch (error) {
            console.error(error);
        }
    },

    getAndUpdateUserInfo: async (email, socket_data) => {
        try {
            return await userDao.getUserInfo(email, socket_data);
        } catch (error) {
            console.error(error);
        }
    },

    checkUsersRoomId: async (user_one, user_two) => {
        try {
            return await userDao.checkUsersRoomId(user_one, user_two);
        } catch (error) {
            console.error(error);
        }
    },

    insertNewRoomIntoRooms: async (roomId, userIdOne, userIdTwo) => {
        try {
            return await userDao.insertIntoRooms_newRoomId(roomId, userIdOne, userIdTwo);
        } catch (error) {
            console.error(error);
        }
    },
    insertNewMessages: async (msg_content, sender_id, room_id) => {
        try {
            return await userDao.insertIntoMessages(msg_content, sender_id, room_id);
        } catch (error) {
            console.error(error);
        }
    },
    insertNewMessageHandler: async (message_saved_id, recipient_user, message_status) => {
        try {
            return userDao.insertIntoMessageHandler(message_saved_id, recipient_user, message_status);
        } catch (error) {
            console.error(error);
        }
    },

    fetchUnreadMessagesOfUser: async (user_id) => {
        try {
            return await userDao.getUnreadMessages(user_id);
        } catch (error) {
            console.error(error);
        }
    },

    update_user_about: async (user_id, about) => {
        try {
            return await userDao.update_users_about_section(user_id, about);
        } catch (error) {
            console.error(error);
        }
    },

    update_user_profile_url: async (user_id, profile_url) => {
        try {
            return await userDao.update_users_profile_url_section(user_id, profile_url);
        } catch (error) {
            console.error(error);
        }
    },

    update_user_contact: async (user_id, contact) => {
        try {
            return await userDao.update_users_contact_section(user_id, contact);
        } catch (error) {
            console.error(error);
        }
    },

    create_new_group: async (room_id, grp_info, participants_array) => {
        try {
            return await userDao.insert_new_group(room_id, grp_info, participants_array);
        } catch (error) {
            console.error(error);
        }
    },

    verify_room_id: async (roomId) => {
        try {
            return await userDao.checkGroupRoomIdExists(roomId);
        } catch (error) {
            console.error(error);
        }
    }



}

module.exports = { chat_services };