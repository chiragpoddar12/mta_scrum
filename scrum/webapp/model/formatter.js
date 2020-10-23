sap.ui.define([], function () {
	"use strict";

	return {
		timerState: function(sValue){
			if(sValue > 30){
				return "Success";
			}else if(sValue > 15){
				return "Warning";
			}{
				return "Error";
			}
		}
	};

});