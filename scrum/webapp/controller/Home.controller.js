sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter"
], function (Controller, JSONModel, formatter) {
	"use strict";

	return Controller.extend("com.sap.scrum.controller.Home", {
	
		formatter:formatter,
		
		onInit: function () {
			var oModel = new JSONModel({
					name : "<h1>Mobile UX Scrum Meeting</h1>", 
					timer : "<h3>60</h3>",
					timeUpText: "<h3>Time Up!!</h3>",
					teamMembers : [], 
					remainingTimePercentage : 100, 
					remainingTime : 60,
					scrumStarted: false, 
					personSpeaking: false, 
					timeUp: false
				});
			this.getView().setModel(oModel);
			this.audio = new Audio("audio/FinishTimer.mp3"); 
		}, 
		
		onStartTimePressed: function(oEvent){
			this.getView().getModel().setProperty("/personSpeaking", true);
			this.getView().getModel().setProperty("/timeUp", false);
			this.timeInterval = setInterval(function(){
				var remainingTime = this.getView().getModel().getProperty("/remainingTime");
				remainingTime--;
				var remainingTimePercentage = (remainingTime/60)*100; 
				
				this.getView().getModel().setProperty("/remainingTime", remainingTime);
				this.getView().getModel().setProperty("/remainingTimePercentage", remainingTimePercentage);
				this.getView().getModel().setProperty("/timer", "<h3>"+remainingTime+"</h3>");
				
				if(remainingTime == 0){
					this.getView().getModel().setProperty("/timeUp", true);
					// this.audio.play();
					clearInterval(this.timeInterval);
				}
			}.bind(this), 1000);       
			// this.audio = new Audio("audio/1MinuteTimer.mp3"); 
			// this.audio.play();
		}, 
		
		onNextPressed: function(oEvent){
			this.getView().getModel().setProperty("/personSpeaking", false);
			this.getView().getModel().setProperty("/timeUp", false);
			clearInterval(this.timeInterval);
			var remainingTime = 60;
			var remainingTimePercentage = 100;
			this.getView().getModel().setProperty("/name", "<h1>"+this._getNextTeamMember()+"</h1>");
			this.getView().getModel().setProperty("/remainingTimePercentage", remainingTimePercentage);
			this.getView().getModel().setProperty("/remainingTime", remainingTime);
			this.getView().getModel().setProperty("/timer", "<h3>"+remainingTime+"</h3>");
			this.audio.pause();
			this.audio.currentTime = 0;
		}, 
		
		onStartScrumPressed: function(oEvent){
			this.getView().getModel().setProperty("/teamMembers", this._getTeamList());
			this.getView().getModel().setProperty("/name", "<h1>"+this._getNextTeamMember()+"</h1>");
			this.getView().getModel().setProperty("/scrumStarted", true);
		},
		
		_getTeamList: function(){
			var aTeamMembers = [
				"Michael Dowling", 
				"Andrew Felle", 
				"James Murphy",
				"Sean Walsh",
				"Puneet Lajpal",
				"Adam Cody",
				"Vincent Lee",
				"Bryan McSpadden",
				"Ovidiu Muntaen",
				"Damilare Olowoniyi",
				"Aivaras Plockis",
				"Roisin Plunkett",
				"Stephen Reilly",
				"Rituraj Sambherao",
				"Neerup Sarkar",
				"Setu Saxena",
				"Pavel Stratan",
				"Agnieszka Szczpankiewicz",
				"Oliver Zimmerman",
				"Sean Leonard",
				"Chirag Poddar", 
				"Mario Mikulandra", 
				"Conor Brennan",
				"Anesi Igunma"

			];
			return aTeamMembers;
		}, 
		
		_getNextTeamMember: function(){
			var aTeamMembers = this.getView().getModel().getProperty("/teamMembers");
			var randomNumber = Math.floor(Math.random()*aTeamMembers.length);
			
			var sTeamMember = aTeamMembers.splice(randomNumber, 1);
			
			if(sTeamMember.length == 0){
				sTeamMember = "Thank you. Scrum Over";
				this.getView().getModel().setProperty("/scrumStarted", false);
			}
			return sTeamMember;
			
		}
	});
});