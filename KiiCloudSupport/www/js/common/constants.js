var DBConstants = {
	// Kii Tables
	APP_BUCKET: "APP_BUCKET",
	// Kii Columns
	COLUMN_ID: "id",
	COLUMN_NAME: "name",
	COLUMN_DESCRIPTION: "description",
	COLUMN_PRICE: "price",
	COLUMN_ADDRESS: "address",	
	COLUMN_PHONE: "phone",
	COMLUMN_USERNAME: "username",
	COMLUMN_PASSWORD: "password",
	COMLUMN_EMAIL: "email",
	COMLUMN_FIRSTNAME: "firstname",
	COMLUMN_LASTNAME: "lastname"

};


/* Kii credentials */
var KII_CREDENTIALS = {
  'APP_ID': 'abc', 
  'APP_KEY': 'abc'   
};

/* Kii hosts */
var KII_HOSTS = {
  'US': 'api.kii.com',
  'JP': 'api-jp.kii.com',
  'CN': 'api-cn2.kii.com',
  'SG': 'api-sg.kii.com'
};

/* Push Notification */
var KiiNotifications = {
	TYPE_NOTIFICATION: "Notification",
	TYPE_UPDATE_NOTIFICATION: "Update Notification",

	// For Custom Data field in Kii Cloud
	CUSTOM_DATA_KEY_KOGAAPP_VERSION: "Version"
};

/* Error message */
var ErrorMessageConstants = {
	ERROR_INCORRECT : "ユーザーIDまたはパスワードが正しくありません。",
	ERROR_NOT_REGISTER : "このユーザーIDがありません。ご登録してください。",
	ERROR_USER_WRONG_FORMAT : "3～64文字の範囲内で'_ , -, .'だけを含めるユーザーIDを正しく入力してください。",
	ERROR_PASSWORD_WRONG_FORMAT : "4～50文字の範囲内でパスワードを正しく入力してください。",
	ERROR_USER_ALREADY_EXISTS : "既存のユーザIDを登録できません。新規なユーザIDを登録してください。"
};
