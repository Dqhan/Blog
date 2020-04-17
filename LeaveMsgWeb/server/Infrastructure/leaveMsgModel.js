/**
 * leaveMsg 表结构
 */
class LeaveMsg {
    constructor(props) {
        let { leavemsg_id, content, time, author } = props;
        this.leavemsg_id = leavemsg_id;
        this.content = content;
        this.time = time;
        this.author = author;
    }
}

module.exports = LeaveMsg;
