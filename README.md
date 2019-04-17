# UI5-workshop

Code repository for the UI5 Workshop on June 12th - check the prerequisites and follow the set up steps below to get started.
* The Workshop slides can be found [here](UI5WorkshopProcurementSlides.pptx)
* The solution including the code for all chapters can be found in branch `master`
* The starting point for the coding exercises can be found in branch `start`

If you like to learn UI5, check out the openSAP courses [Developing Web Apps With SAPUI5](https://open.sap.com/courses/ui51) and [Evolved Web Apps With SAPUI5](https://open.sap.com/courses/ui52).
You can also find a lot more information on [SAPUI5](https://ui5.sap.com) and [OpenUI5](https://openui5.org) on our official info pages.

## Prerequisites (only step 2+3 is needed needed for internal users)

1. [Create a trial account](https://developers.sap.com/germany/tutorials/hcp-create-trial-account.html) on the SAP Hana Cloud Platform. You can also re-use an existing account.

2. [Create an account](https://developers.sap.com/germany/tutorials/gateway-demo-signup.html) on our SAP Gateway Demo System ES5. All necessary steps are described in the tutorial.

3. [Set up a destination](https://sapui5.hana.ondemand.com/#/topic/3a16c7a2f1e944deb000db49e5ece6be) to ES5 in your SAP Cloud Platform trial account. To do so, simply import the file [ES5](ES5) into your destinations.

## Setup

To follow along the demo, please do the following set up steps

1. Go to SAP Web IDE and clone this repository into your workspace

> *Note:* if you prefer local development you can use your favorite IDE with [UI5 tooling](https://github.com/SAP/ui5-tooling))

2. Go to the `git` pane on the right and click the `+` sign next to the `master` branch

3. Create a new branch `start` based on `origin/start`

4. Run the file `index.html` and make sure that you see the UI5 Workshop app and list of products.

5. If you have trouble with the ES5 connection, you can fallback to mock data using `test/mockServer.html` as an entry point.

## Steps

These steps will enhance the UI5 Workshop app with a third column and other new and advanced features of SAPUI5.
Choose your flavor or do the individual chapters in order to cover all aspects.

The app is based on an SAP Fiori Master Detail template and shows a list of products.
The solution of all steps and flavors is located in the `master` branch.

### Explore the project

Note that the project is set up according to our [evolved best practices for app developers](https://sapui5.hana.ondemand.com/#/topic/28fcd55b04654977b63dacbee0552712).

* General
  * Fiori 3 Theme
  * Precofigured Fiori Flexible Column layout with two columns
  * Best Practice starting point for custom app development

* Index
  * Declarative Component Start
  * Asynchronous loading of all resources
  * CSP Compliant (no JavaScript in HTML pages)

* Quality
  * Preconfigured mockserver and testing tools
  * Basic test coverage of the template features
  * Karma-ready unit and integration tests

### New Web IDE Tools

This flavor introduces the new storyboard perspective in SAP Web IDE.

#### Create an Info View

1. **Detail.view.xml:** Add a new Button at the end of the `<semantic:headerContent>`section of detail page:

    ``` xml
      <Button type="Emphasized" text="info"/>
    ```

2. In SAP Web IDE, go to the `Storyboard Editor` perspective

3. Choos the project `UI5 Workshop`

4. Add a new view called `Info`

5. Click on the view `Detail.view.xml` and select the arrow button (configure navigation):

6. Choose the following settings

    * Control: info Button
    * Navigate to: Info
    * Open target as: `endColumnPages`

7. **Info.controller.js:** Update the info controller (set up a formatter and switch to three column layout):

    ``` js
    sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "../model/formatter"
       ], function (Controller, formatter) {
        "use strict";
    
        return Controller.extend("ui5.workshop.controller.Info", {
    
            formatter: formatter,
    
             /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf ui5.workshop.view.Info
             */
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("Info").attachPatternMatched(function () {
                    this.getView().getModel("appView").setProperty("/layout", "ThreeColumnsMidExpanded");
                }.bind(this));
            }
    
        });
    
       });
    ```

8. **.manifest.json:** Adjust the targets to display all three columns (add entries "master and "object")

    ``` json
    {
        "name": "Info",
        "pattern": "Info",
        "target": [
            "master",
            "object",
            "Info"
        ]
    }
    ```

> *Note:* Technically the info route pattern needs to be adjusted to contain the `objectId` as a context parameter, we skip this step to keep the example simple. To learn more about Navigation, check the [Navigation and Routing tutorial](https://ui5.sap.com/#/topic/1b6dcd39a6a74f528b27ddb22f15af0d).

9. Test that the new setup works

10. **detail.controller.js:** Note that when you reload the app the detail page is not displayed propertly, attach to the info route in the detail controller to fix this

    ```js
    onInit: function () {
        ...
        this.getRouter().getRoute("Info").attachPatternMatched(this._onObjectMatched, this);
    }
    ```

#### Add layout controls to the new view

Let's add some new UI controls to the app to display additional product infos

1. In the `storyboard editor` perspective double click on the info view

2. Adjust the title to "Product Info"

3. Drop a `Panel` from the `Container` section and name it `Image`

4. Remove the `Text` control with text `panel content`

5. Drop an `Image` control from the `Display` section and set width to `100%`, height to nothing

6. **Info.view.xml:** Exchange the image with our product image and formatter

    ``` xml
    <Image src="{ path: 'Name', formatter: '.formatter.pictureURL' }" width="100%" id="image0"/>
    ```

7. Drop an `IconTabBar` control from the `Container` section

8. Open the app and test the new features

### New Fiori 3 Controls

This flavor enables the new Fiori 3 theme and uses some of the recent controls

#### Enable the SAP Quarts theme

4. **index.html:** Change the parameter `sap-ui-theme` from `sap_blue_crystal` to `sap_fiori_3`

    ``` html
        <script id="sap-ui-bootstrap"
                src="../../resources/sap-ui-core.js"
                data-sap-ui-theme="sap_fiori_3"
                data-sap-ui-resourceroots='{
                    "ui5.workshop": "./"
                }'
                data-sap-ui-oninit="module:sap/ui/core/ComponentSupport"
                data-sap-ui-compatVersion="edge"
                data-sap-ui-async="true"
                data-sap-ui-frameOptions="trusted">
            </script>
    ```

#### Add a Fiori 3 Card

Fiori 3 offers an evolved [cards](https://experience.sap.com/fiori-design-web/overview-page-card/) concept. Let's integrate this feature in our app.

1. Go to https://ui5.sap.com/ > Documentation > What's new > What's new with 1.64

2. Take a look at the `sap.f.Card` examples and click on [sample](https://ui5.sap.com/#/entity/sap.f.Card/sample/sap.f.sample.Card)

3. Click on the `Show source code` button in the upper right

4. **Info.view.xml or Detail.view.xml:** Add the following namespaces at the top and code after the image panel to show a card

    ``` xml
        xmlns:f="sap.f"
        xmlns:card="sap.f.cards"
        xmlns:tnt="sap.tnt"
    ```
    
    ``` xml
        <f:Card
            class="sapUiMediumMargin"
            width="300px">
            <f:header>
                <card:Header
                    title="Project Cloud Transformation"
                    subtitle="Revenue per Product | EUR"/>
            </f:header>
            <f:content>
                <List
                    showSeparators="None"
                    items="{path: '/productItems'}" >
                    <CustomListItem>
                        <HBox
                             alignItems="Center"
                            justifyContent="SpaceBetween">
                            <VBox class="sapUiSmallMarginBegin sapUiSmallMarginTopBottom" >
                                <Title level="H3" text="{title}" />
                                <Text text="{subtitle}"/>
                            </VBox>
                            <tnt:InfoLabel
                                class="sapUiTinyMargin"
                                text="{revenue}"
                                colorScheme= "{statusSchema}"/>
                        </HBox>
                    </CustomListItem>
                </List>
            </f:content>
        </f:Card>
    ```

5. Browse the [metadata.xml](webapp/localService/metadata.xml) file to see which other entities the ES5 service `GWSAMPLE_BASIC` offers

6. Let's implement a panel with customers that bought the product with the following code:

    ``` xml
        <f:Card width="100%">
            <f:header>
                <card:Header title="Customers" subtitle="This product was bought by"/>
            </f:header>
            <f:content>
                <List showSeparators="None" items="{path: '/ContactSet'}">
                    <CustomListItem>
                        <HBox alignItems="Center" justifyContent="SpaceBetween">
                            <VBox class="sapUiSmallMarginBegin sapUiSmallMarginTopBottom">
                                <Title level="H3" text="{FirstName} {LastName}"/>
                                <Text text="{EmailAddress}"/>
                                <Text text="{Address/City}"/>
                            </VBox>
                            <tnt:InfoLabel class="sapUiTinyMargin" text="{BusinessPartnerID}" colorScheme="{	  path: 'BusinessPartnerID',	  formatter: '.formatter.deliveryStatus'	 }"/>
                        </HBox>
                    </CustomListItem>
                </List>
            </f:content>
        </f:Card>
    ```

7. Open the app and check that everything is working as designed

#### Add a Fiori 3 GridContainer

Now we are going to put the Card into a sap.f.GridContainer` and add some other tiles as well

1. **Info.view.xml** or **Detail.view.xml**: Add the `sap.f.GridContainer` control around the `sap.f.Card`:

    ```xml
    <f:GridContainer class="sapUiSmallMargin">
        <f:items>
            <f:Card>...</f:card>
        </f:items>
    </f:GridContainer>
    ```

2. **Info.view.xml** or **Detail.view.xml**: Define additional layout properties for the grid container:

    ```xml 
    <f:layout>
        <f:GridContainerSettings rowSize="5rem" columnSize="5rem" gap="1rem" />
    </f:layout>
    <f:layoutS>
        <f:GridContainerSettings rowSize="4.25rem" columnSize="4.25rem" gap="0.75rem" />
    </f:layoutS>
    ```

3. **Info.view.xml** or **Detail.view.xml**: Add some tiles before and after the card

    ```xml 
    <GenericTile header="Sales Fulfillment Application Title" subheader="Subtitle">
        <layoutData>
            <f:GridContainerItemLayoutData minRows="2" columns="2" />
        </layoutData>
        <TileContent unit="EUR" footer="Current Quarter">
            <ImageContent src="sap-icon://home-share" />
        </TileContent>
    </GenericTile>
    
    <GenericTile header="Manage Activity Master Data Type" subheader="Subtitle">
        <layoutData>
            <f:GridContainerItemLayoutData minRows="2" columns="2" />
        </layoutData>
        <TileContent>
            <ImageContent src="sap-icon://activities" />
        </TileContent>
    </GenericTile> 
    
    <GenericTile header="Purchose Order requisitions" subheader="Subtitle">
        <layoutData>
            <f:GridContainerItemLayoutData minRows="2" columns="2" />
        </layoutData>
        <TileContent>
            <ImageContent src="sap-icon://nutrition-activity" />
        </TileContent>
    </GenericTile>
    
    <f:card>...</f:card>
    
    <GenericTile header="Cumulative Totals" subheader="Subtitle">
        <layoutData>
            <f:GridContainerItemLayoutData minRows="2" columns="2" />
        </layoutData>
        <TileContent unit="Unit" footer="Footer Text">
            <NumericContent value="12" />
        </TileContent>
    </GenericTile>

    <GenericTile header="Travel and Expenses" subheader="Access Concur">
        <layoutData>
            <f:GridContainerItemLayoutData minRows="2" columns="2" />
        </layoutData>
        <TileContent>
            <ImageContent src="sap-icon://travel-expense" />
        </TileContent>
    </GenericTile>
    ```

4. **Info.view.xml** or **Detail.view.xml**: Configure the card to consume 4 columns and rows

    ```xml
    <f:Card>
        <f:layoutData>
            <f:GridContainerItemLayoutData minRows="4" columns="4" />
        </f:layoutData>
    ```

### New XML Composites

This flavor shows how to create a new composite control and enable drag and drop for existing controls

#### Create an OrderPreparations control

XML composites are lightweight custom controls that come with a declarative renderer similar to XML fragments.
We are going to add an order preparations control that facilitates packaging and shipping of the articles in the app.

1. **control/OrderPreparations.js:** (new) Create a new file and folder with the metadata of the XML composite. It inherits from the generic base class `XMLComposite` and extends it with additional metdata and methods:

    ``` js
    sap.ui.define([
        "sap/ui/core/XMLComposite"
    ], function(XMLComposite){
        "use strict";
    
        return XMLComposite.extend("ui5.workshop.control.OrderPreparations", {
            metadata: {
                properties: {
                    switchStateItems: { type:"boolean", defaultValue: false},
                    switchStateInvoice: { type:"boolean", defaultValue: false},
                    switchStateSample: { type:"boolean", defaultValue: false}
                },
                events: {
                    confirm: {}
                }
            },
    
            onConfirm: function() {
                this.fireEvent("confirm", {});
                this.byId("orderPreparations").setExpanded(false);
                this._resetSwitches();
            },
    
            reset: function() {
                this.byId("orderPreparations").setExpanded(true);
                this._resetSwitches();
            },
    
            _resetSwitches: function() {
                this.setSwitchStateItems(false);
                this.setSwitchStateInvoice(false);
                this.setSwitchStateSample(false);
            }
    
        });
    
    });
    ```

2. **control/OrderPreparations.control.xml:** (new) Create a new file with the declarative UI for the XML composite. Note the special usage of the `self` model in the binding syntax. 

    ``` xml
    <core:FragmentDefinition
        xmlns="sap.m"
        xmlns:core="sap.ui.core"
        xmlns:l="sap.ui.layout">
        <Panel
            headerText="{i18n>OrderPreparationTitle}"
            expandable="true"
            expanded="true"
            id="orderPreparations">
            <l:HorizontalLayout allowWrapping="true">
                <Label text="{i18n>PackItemsTitle}" class="sapUiSmallMargin"/>
                <Switch
                    id="packItemsSwitch"
                    state="{$this>/switchStateItems}"
                    type="AcceptReject"/>
            </l:HorizontalLayout>
            <l:HorizontalLayout allowWrapping="true">
                <Label text="{i18n>PrintInvoiceTitle}" class="sapUiSmallMargin"/>
                <Switch
                    id="printInvoiceSwitch"
                    state="{$this>/switchStateInvoice}"
                    type="AcceptReject"/>
            </l:HorizontalLayout>
            <l:HorizontalLayout allowWrapping="true">
                <Label text="{i18n>AddSampleTitle}" class="sapUiSmallMargin"/>
                <Switch
                    id="addSampleSwitch"
                    state="{$this>/switchStateSample}"
                    type="AcceptReject"/>
            </l:HorizontalLayout>
            <Button
                id="confirm"
                text="{i18n>ConfirmPreparations}"
                type="Emphasized"
                class="sapUiSmallMarginBegin"
                press=".onConfirm"
                enabled="{= ${$this>/switchStateItems} &amp;&amp; ${$this>/switchStateInvoice} &amp;&amp; ${$this>/switchStateSample}}"/>
        </Panel>
    </core:FragmentDefinition>
    ```

3. **Detail.view.xml:** Add the new namespace to the XML view so that the control can be used

    ```xml
        xmlns:control="opensap.orders.control"
    ```

4. **Detail.view.xml:** Add the new control to the content of the semantic page after the `SimpleForm`tag:

    ```xml
        <control:OrderPreparations
            id="orderPreparations"
            confirm=".onConfirm"/>
    ```

#### Enable Drag & Drop

Drag and drop has been added as a recent feature. To configure it you only need to add configuration

1. **Master.view.xml:** Add the drag and drop namespace and config to your view to allow reordering of the master list items:

    ``` xml
        xmlns:dnd="sap.ui.core.dnd"
    ``` xml
    <List>
        <dragDropConfig>
            <dnd:DragDropInfo sourceAggregation="items" targetAggregation="items" dropPosition="Between" drop=".onReorder"/>
        </dragDropConfig>
    ...
    ```

2. **Master.controller.js:** Add the controller logic to reorder the items in the UI (in productive apps the new order would also be persisted on the back end, of course):

    ``` js
            /**
             * Reorder the list based on drag and drop actions
             * @param {sap.ui.base.Event} oEvent the drop event of the sap.ui.core.dnd.DragDropInfo
             */
            onReorder: function (oEvent) {
                var oDraggedItem = oEvent.getParameter("draggedControl"),
                    oDroppedItem = oEvent.getParameter("droppedControl"),
                    sDropPosition = oEvent.getParameter("dropPosition"),
                    oList = this.byId("list"),
                    // get the index of dragged item
                    iDraggedIndex = oList.indexOfItem(oDraggedItem),
                    // get the index of dropped item
                    iDroppedIndex = oList.indexOfItem(oDroppedItem),
                    // get the new dropped item index
                    iNewDroppedIndex = iDroppedIndex + (sDropPosition === "Before" ? 0 : 1) + (iDraggedIndex < iDroppedIndex ? -1 : 0);
    
                // remove the dragged item
                oList.removeItem(oDraggedItem);
                // insert the dragged item on the new drop index
                oList.insertItem(oDraggedItem, iNewDroppedIndex);
            }
    ```

3. Open the app and drag and drop an item in the list.

4. That's all for today, feel free to dig deeper and play around with the existing codebase!

I hope you liked the UI5 workshop!

Have fun,

**Michael**

## Questions

If you have questions on SAPUI5, feel free to join our OpenUI5 Slack group

## License

All example code in this repository is licensed under the Apache Software License, Version 2.0 except as noted otherwise in the [LICENSE](https://github.com/SAP/openSAP-ui5-course/blob/master/LICENSE) file.