/**
 * user 表结构
 */
class User {
    constructor(props) {
        let { user_id, username, password, type } = props;
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.type = type;
    }
}

module.exports = User;
