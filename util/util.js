
module.exports = {
	extend: function (rawObj, copyObj) {
		if(!rawObj){
        rawObj={};
	    }
	    for (let key in copyObj) {
	        rawObj[key] = copyObj[key];
	    }
	    return rawObj;
	},

	
}
