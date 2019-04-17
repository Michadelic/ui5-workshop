/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	sap.ui.require([
		"ui5/workshop/test/integration/PhoneJourneys"
	], function() {
		QUnit.start();
	});
});