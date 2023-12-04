/* eslint-disable no-bitwise */
const dotenv = require('dotenv');

dotenv.config();

const vcap_services = process.env.VCAP_SERVICES;
let customize_string = process.env;

if (vcap_services) {
	const dataParse = JSON.parse(vcap_services);
	console.log(dataParse['user-provided']);
	customize_string = dataParse['user-provided'][0].credentials
}

module.exports = {
	db_host: customize_string.DB_HOST,
	db_user_name: customize_string.DB_USERNAME,
	db_password: customize_string.DB_PASSWORD,
	db_name: customize_string.DB_NAME,
	test_db_name: "",//customize_string.DB_NAME,
	db_dialect: customize_string.DB_DIALECT,
	db_pool: {
		max: customize_string.DB_POOL_MAX,
		min: customize_string.DB_POOL_MIN,
		acquire: customize_string.DB_POOL_ACQUIRE,
		idle: customize_string.DB_POOL_IDLE,
	},
	mongo_url: customize_string.MONGO_URL,
	mqtt_server: customize_string.MQTT_SERVER,
	twilio_account_sid: customize_string.TWILIO_ACCOUNT_SID,
	twilio_auth_token: customize_string.TWILIO_AUTH_TOKEN,
	twilio_phone_number: customize_string.TWILIO_PHONE_NUMBER,
	custom_number: customize_string.CUSTOM_NUMBER,
	stripe_sceret_key:customize_string.STRIPE_SECRET_KEY,
	port: customize_string.PORT,
	base_url: customize_string.BASE_URL,
	localBaseUrl: customize_string.localBaseUrl,
	env_variable: customize_string.NODE_ENV,
	jwt_key: customize_string.JWT_KEY,
	salt_round: customize_string.SALT_ROUND,
	swagger_origin: customize_string.SWAGGER_ORIGIN,
	encrypt_key: customize_string.ENCRYPT_KEY,
	access_key_id: customize_string.ACCESS_KEY_ID,
	secret_access_key: customize_string.SECRET_ACCESS_KEY,
	aws_region: customize_string.AWS_REGION,
	mail_host: customize_string.MAIL_HOST,
	mail_username: customize_string.MAIL_USERNAME,
	mail_password: customize_string.MAIL_PASSWORD,
	mail_support_value: customize_string.SUPPORT_MAILID,
	server_key: customize_string.SERVER_KEY,
	login_id: customize_string.LOGIN_ID,
	email_id: customize_string.EMAIL_ID,
	transaction_key: customize_string.TRANSACTION_KEY
}

