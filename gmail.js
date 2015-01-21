// Script set up, helpers and libs
var fs = require('fs'),
	outputDir = "output/",
	inputDir = "input/",
	libsDir = "libs/",
	system = require('system'),
	utils = require('utils'),
	casper = require('casper').create({
		logLevel: "error",
		clientScripts: [
			libsDir + 'jquery.js',
			libsDir + 'handlebars.js'
		],
		pageSettings: {
			loadPlugins: false
		},
	});

var application = {

	// Global variables
	// This is where you put the password you wish to check
	global: {
		gmail: "https://accounts.google.com/ServiceLogin?service=mail&passive=true&rm=false&continue=https://mail.google.com/mail/&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1",
		addresses: [],
		outputUrls: [],
		naughty: [],
		password: "",
		currentEmail: ""
	},

	init: function() {
		var self = this;

		// Get emails from file
		self.getData();

	}, // init

	getData: function() {

		// set file to get urls from
		application.global.dataFile = inputDir + "emails.csv";

		// Loop through email addresses and put in array to use later
		application.getEmailAddresses();

	},

	getEmailAddresses: function() {
		var self = this;

		var details = fs.read(application.global.dataFile).split(",");

		for (var i = 0; i < details.length; i++) {

			if (details[i] != "") {

				// var email = details[i].replace(",", "");
				var email = details[i];

				// Store the url in our array, we might need it later
				application.global.addresses.push(email);

			} // if

		} // for

		// Process the addresses
		application.testLogin();

	},

	testLogin: function() {

		// Start
		casper.start();

		casper.then(function() {

			// Loop through each email
			this.eachThen(application.global.addresses, function(email) {

				this.echo("Processing: " + email.data);

				// Set email in application to use later
				application.global.currentEmail = email.data;

				// Open google mail
				this.thenOpen('https://accounts.google.com/ServiceLogin?service=mail&continue=https://mail.google.com/mail/&hl=en', function(){

					// Check currently set email
					this.echo('Current email: ' + application.global.currentEmail);

					// Fill login form and submit
				    this.fill('#gaia_loginform', {
				    	Email: application.global.currentEmail,
				    	Passwd: application.global.password
				    }, true);
				   
				    // Wait for selector on inbox
				    this.waitForSelector(".T-I.J-J5-Ji.T-I-KE.L3",function(){
				    	console.log('not changed password');
				        application.global.naughty.push(application.global.currentEmail);
				    }, function timeout(){
				    	console.log('not logged in');
				    });

				});

			});

		});

		// Write results to json file
		casper.then(function(){

			// Strinify the naughty people
			var output = JSON.stringify(application.global.naughty);
			// Write to results.json
			fs.write(outputDir + "results.json", output, 'w');

		});

		// Run
		casper.run();

	}

}; // application

application.init();