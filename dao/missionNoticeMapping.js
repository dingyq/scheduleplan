var missionNotice = {
	insert:'INSERT INTO missionnotice(id, state, deadlineTime, createUserName, completeTime, type, title, createTime, dutyId, dutyName, createUserId, needClock, content) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
	update:'update missionnotice set state=?, deadlineTime=?, createUserName=?, completeTime=?, type=?, title=?, createTime=?, dutyId=?, dutyName=?, createUserId=?, needClock=?, content=? where createUserId=?',
	delete: 'delete from missionnotice where id=?',
	queryById: 'select * from missionnotice where id=?',
	queryAll: 'select * from missionnotice where createUserId=?'
};
 
module.exports = missionNotice;