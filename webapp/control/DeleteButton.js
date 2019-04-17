sap.ui.define([
	"sap/m/Button"
], function (Button) {
	"use strict";

	return Button.extend("ui5.workshop.control.DeleteButton", {

		metadata : {
			dnd: {
				droppable: true
			}
		},
		renderer : {}

	});
});