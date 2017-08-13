
module.exports = {
	extend: function (rawObj, copyObj) {
		if(!rawObj){
        rawObj={};
	    }
	    for (var key in copyObj) {
	        rawObj[key] = copyObj[key];
	    }
	    return rawObj;
	},


}
