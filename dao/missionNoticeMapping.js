var missionNotice = {
	insert:'INSERT INTO missionnotice(missionId, state, deadlineTime, createUserName, completeTime, type, title, createTime, dutyId, dutyName, createUserId, needClock, content) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
	update:'update missionnotice set state=?, deadlineTime=?, completeTime=?, type=?, title=?, dutyId=?, dutyName=?, needClock=?, content=?',
	delete: 'delete from missionnotice where missionId=?',
	queryById: 'select * from missionnotice where missionId=?',
	queryAll: 'select * from missionnotice where createUserId=?'
};
 
module.exports = missionNotice;