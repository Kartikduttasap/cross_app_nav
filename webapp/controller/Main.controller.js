sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("ns.crossapp.controller.Main", {
            onInit: function () {

            },

            onNav: function (oEvent) {
                debugger;
                // Obtaining the Interface
                var oCrossAppNav = sap.ushell.Container.getService("CrossApplicationNavigation");

                // Generating a Link to Another App from a Semantic Object and Action
                var hrefForProductDisplay = oCrossAppNav.hrefForExternal({
                    target: { semanticObject: "ZKD_SEM_OBJ", action: "ui_demo" }
                    // ,params: { ProductID: ["102343333"] }
                });

                // Checking whether the User Can Actually Navigate to a Target App on the Current Device
                oCrossAppNav.isNavigationSupported([
                    { target: { hrefForProductDisplay } }
                ])
                    .done(function (aResponse) {
                        aResponse.map(function (elem, index) {
                            if (elem.supported === true) {
                                // trigger navigation
                                oCrossAppNav.toExternal({
                                    target: { semanticObject: "ZKD_SEM_OBJ", action: "ui_demo" }
                                });
                            }
                            else {
                                // disable link
                            }
                        });
                    })
                    .fail(function () {
                        // disable all links
                        MessageBox.error("Navigation Failed");
                    });
            }
        });
    });
