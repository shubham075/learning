const { sql_conn } = require('../../config/sql_db');

const userDao = {

    getUserById: async (id) => {
        return new Promise((resolve, reject) => {
            const response = {};
            const query = `SELECT * from users WHERE users.id = ? `;
            sql_conn.query(query, [id], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    response.user_exist = result.length > 0;
                    response.user_data = result[0];
                    resolve(response);
                }
            });
        });

    },

    updateStatusToOnline: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE users SET users.user_info = JSON_SET(user_info, '$.status', 'online') WHERE users.id = ?`;

            sql_conn.query(query, [id], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    updateStatusToOffline: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE users SET users.user_info = JSON_SET(user_info, '$.status', 'offline') WHERE users.id = ?`;

            sql_conn.query(query, [id], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    update_users_about_section: async (id, about) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE users SET users.user_info = JSON_SET(user_info, '$.about', ?) WHERE users.id = ?`;

            sql_conn.query(query, [about, id], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    const updatedRowId = result.insertId;
                    resolve(updatedRowId);
                }
            });
        });
    },

    update_users_profile_url_section: async (id, profile_url) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE users SET users.user_info = JSON_SET(user_info, '$.profile_url', ?) WHERE users.id = ?`;

            sql_conn.query(query, [profile_url, id], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    const updatedRowId = result.insertId;
                    resolve(updatedRowId);
                }
            });
        });
    },

    update_users_contact_section: async (id, contact) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE users SET users.user_info = JSON_SET(user_info, '$.contact', ?) WHERE users.id = ?`;

            sql_conn.query(query, [contact, id], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    const updatedRowId = result.insertId;
                    resolve(result);
                }
            });
        });
    },

    getUnreadMessages: async (user_id) => {
        return new Promise((resolve, reject) => {
            const response = {};
            const query = `SELECT * from messages WHERE messages.id IN( SELECT messagestatushandlers.message_id FROM messagestatushandlers WHERE messagestatushandlers.status = 'undelivered' ) AND messages.room_id = ? ORDER BY messages.createdAt DESC`;

            const query2 = `SELECT * from messages WHERE messages.id IN( SELECT messagestatushandlers.message_id FROM messagestatushandlers WHERE messagestatushandlers.status = 'undelivered' ) AND messages.room_id IN (SELECT usersrooms.room_id from usersrooms WHERE usersrooms.user_id = ?) ORDER BY messages.createdAt DESC `;

            sql_conn.query(query2, [user_id], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    response.isMessage = result.length > 0;
                    response.messages = result;
                    resolve(response);
                }
            });
        });
    },

    getAllUsers_unreadMessages: async (user_id) => {
        return new Promise((resolve, reject) => {
            const response = {};
            // const query = `SELECT * from users WHERE id IN (SELECT user_id from usersrooms WHERE room_id IN
            //                 (SELECT room_id FROM usersrooms WHERE user_id = ?) 
            //                 AND user_id!= ?)`;

            const query = `SELECT DISTINCT CASE WHEN r.group_type = 'user' THEN u.id ELSE r.id END AS chat_name FROM usersrooms ur JOIN rooms r ON ur.room_id = r.id LEFT JOIN users u ON ur.user_id = u.id WHERE ur.room_id IN (SELECT room_id FROM usersrooms WHERE user_id = ?) AND ur.user_id != ?;
            `;

            const query2 = `SELECT messages.* FROM messages, messagestatushandlers WHERE messages.id = messagestatushandlers.message_id
                AND messagestatushandlers.status = 'undelivered' AND messages.room_id IN ( SELECT room_id FROM usersrooms WHERE user_id = ? )
                AND messages.sender_id != ? `;

            sql_conn.query(query, [user_id, user_id], (err, result1) => {
                if (err) {
                    reject(err);
                }
                else {
                    sql_conn.query(query2, [user_id, user_id], (err, result2) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            response.chat_users = result1.length > 0;
                            response.chat_users_list = result1;
                            response.unread_messages = result2;
                            resolve(response);
                        }
                    });
                }
            });
        });
    },

    checkGroupRoomIdExists: async (room_id) => {
        return new Promise((resolve, reject) => {
            const response = {};
            // 214254c0-1be5-11ee-9074-7ddef7c32ed3
            const query = `SELECT * FROM rooms WHERE rooms.id = ? AND rooms.group_type = 'group'`;
            const query2 = `SELECT usersrooms.user_id from usersrooms WHERE usersrooms.room_id = ?`;

            sql_conn.query(query, [room_id], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                response.isRoomId = result.length > 0;
                response.room_id_data = result;
                sql_conn.query(query2, [room_id], (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    response.room_id_members = result;
                    resolve(response);
                });
            });
        });
    },

    getUserInfo: async (email, socket_data) => {
        return new Promise((resolve, reject) => {
            const response = {};

            const query1 = `SELECT COUNT(*) AS count FROM users WHERE users.email_id = ?`;
            const query2 = `UPDATE users SET users.socket_info = ? WHERE email_id = ?`;
            const query3 = `SELECT * FROM users WHERE users.email_id = ?`;

            sql_conn.query(query1, [email], (err, user) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (user[0].count === 0) {
                    response.user_exist = false;
                    resolve(response);
                } else {
                    response.user_exist = true;

                    sql_conn.query(query2, [socket_data, email], (err, updated_info) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        response.updated_info = updated_info;

                        sql_conn.query(query3, [email], (err, user_data) => {
                            if (err) {
                                reject(err);
                                return;
                            }

                            response.user_data = user_data;
                            resolve(response);
                        });
                    });
                }
            });
        });
    },

    checkUsersRoomId: async (user_one, user_two) => {
        return new Promise((resolve, reject) => {
            const response = {};
            const query = `SELECT room_id FROM usersrooms WHERE user_id = ? OR user_id = ? GROUP BY room_id HAVING COUNT(DISTINCT user_id) = 2`;

            sql_conn.query(query, [user_one, user_two], (err, result) => {
                if (err) {
                    reject(err)
                }
                else {
                    if (result.length === 0) {
                        response.Isroom_id = false;
                        response.room_id = result;
                        resolve(response);
                    }
                    else {
                        response.Isroom_id = true;
                        response.room_id = result[0].room_id;
                        resolve(response);
                    }
                }
            })
        })
    },

    insertIntoRooms_newRoomId: async (roomId, userIdOne, userIdTwo) => {
        return new Promise((resolve, reject) => {
            const response = {};
            const query1 = `INSERT INTO rooms (id) VALUES (?);`;
            const query2 = `INSERT INTO usersrooms (user_id, room_id) VALUES (?, ?); `;

            sql_conn.beginTransaction((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                sql_conn.query(query1, [roomId], (err, result) => {
                    if (err) {
                        sql_conn.rollback(() => reject(err));
                        return;
                    }
                    response.query1 = result;
                    sql_conn.query(query2, [userIdOne, roomId], (err, result) => {
                        if (err) {
                            sql_conn.rollback(() => reject(err));
                            return;
                        }
                        response.query2 = result;
                        sql_conn.query(query2, [userIdTwo, roomId], (err, result) => {
                            if (err) {
                                sql_conn.rollback(() => reject(err));
                                return;
                            }
                            response.subquery2 = result;
                            sql_conn.commit((err) => {
                                if (err) {
                                    sql_conn.rollback(() => reject(err));
                                    return;
                                }
                                resolve(response);
                            });
                        });
                    });
                });
            });
        });
    },

    insert_new_group: async (room_id, grp_info, participants_array) => {
        return new Promise((resolve, reject) => {
            const response = {};
            const query1 = `INSERT INTO rooms (id, group_type, description) VALUES(?, ?, ?)`;
            const query2 = `INSERT INTO usersrooms (user_id, room_id, isAdmin) VALUES (?, ?, ?)`;

            sql_conn.beginTransaction((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                sql_conn.query(query1, [room_id, 'group', grp_info], (err, result) => {
                    if (err) {
                        sql_conn.rollback(() => reject(err));
                        return;
                    }
                    response.room_inserted_id = room_id;

                    //loop through participants data:::::::::
                    const promise_one = participants_array.map((participant) => {
                        return new Promise((resolve, reject) => {
                            sql_conn.query(query2, [participant.user_id, room_id, participant.isAdmin], (err, result) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                resolve(result);
                            });
                        });
                    });
                    Promise.all(promise_one)
                        .then((result) => {
                            response.users_inserted_ids = [];
                            result.forEach((ele) => {
                                response.users_inserted_ids.push(ele.insertId);
                            });
                            sql_conn.commit((err) => {
                                if (err) {
                                    sql_conn.rollback(() => reject(err));
                                    return;
                                }
                                response.room_generated = true;
                                resolve(response);
                            })
                        })
                        .catch((err) => {
                            sql_conn.rollback(() => reject(err))
                        });
                });
            });

        });
    },

    getUser_messages: async (roomId) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM messages WHERE messages.room_id = ? ORDER BY messages.createdAt DESC`;

            sql_conn.query(query, [roomId], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    const response = {
                        isMessage: result.length > 0,
                        messages_info: result
                    }
                    resolve(response);

                }
            });
        });
    },

    insertIntoMessages: async (msg_content, sender_id, room_id) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO messages (content, sender_id, room_id) VALUES (?, ?, ?)`;

            sql_conn.query(query, [msg_content, sender_id, room_id], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    const messageId = result.insertId
                    resolve(messageId);
                }
            });
        });
    },

    insertIntoMessageHandler: async (message_saved_id, recipient_user, message_status) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO messagestatushandlers (message_id, recipient_id, status) VALUES ( ?, ?, ? )`;

            sql_conn.query(query, [message_saved_id, recipient_user, message_status], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    },



}

module.exports = { userDao };