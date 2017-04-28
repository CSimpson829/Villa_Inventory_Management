
//Set up the Edit Item Modal by populating the Input forms with data from the Table ---------------------------------------
function editItemSetup(element, id, date, time){
    var valueArray = new Array();
    $(element).closest("td").siblings().each(function () {
        valueArray.push($(this).text().trim());
    });
    $("#inputModalGlyph").removeClass("fa fa-plus-circle fa-2x");
    $("#inputModalGlyph").addClass("fa fa-edit fa-2x")
    $("#inputModalTitle").text(" Edit Item");
    $("#deleteButton").show();
    $("#inventory_idInput").val(id);

    $("#purchase_date_stringInput").val(date);
    $("#purchase_date_stringInput").datepicker("update",date);
    $("#purchase_time_stringInput").val(time);

    $("#inputModal").modal("show");
    $("#removeButton").show();

    $("#descriptionInput").val(valueArray[0]);
    $("#categoryInput").val(valueArray[1]);
    $("#quantityInput").val(valueArray[2]);
    $("#serial_numberInput").val(valueArray[3]);
    
    $("#assigned_employeeInput").val(valueArray[5]);
    $("#logged_employeeInput").val(valueArray[7]);;
    $("#notesInput").val(valueArray[8]);

    resetError();
    
}

//Sets up the New Item Modal by clearing it of all data potentially left over from Opening the Edit Item Modal ------------
function newItemSetup() {
    $("#inputModalGlyph").removeClass("fa fa-edit fa-2x");
    $("#inputModalGlyph").addClass("fa fa-plus-circle fa-2x");
    $("#inputModalTitle").text(" Add New Item");

    $("#deleteButton").hide();
    $("#inventory_idInput").val('');
    $("#descriptionInput").val('');
    $("#categoryInput").val('');
    $("#quantityInput").val('');
    $("#purchase_date_stringInput").val('');
    $("#purchase_time_stringInput").val('');
    $("#serial_numberInput").val('');
    $("#assigned_employeeInput").val('');
    $("#logged_employeeInput").val('');
    $("#notesInput").val('');

    resetError();
}

//Sets up the View Modal by populating the Fields with Data from the Table ------------------------------------------------
function viewModalSetup(element, id, purchasedate, purchasetime, logdate, loggedtime) {
    var valueArray = new Array();
    $(element).closest("td").siblings().each(function () {
        valueArray.push($(this).text().trim());
    });
    $("#inventory_idInput").val(id);
    $("#purchaseDateInfo").val(purchasedate);
    $("#purchaseTimeInfo").val(purchasetime);
    $("#loggedDateInfo").val(logdate);
    $("#loggedTimeInfo").val(loggedtime);

    $("#descriptionInfo").val(valueArray[0]);
    $("#categoryInfo").val(valueArray[1]);
    $("#quantityInfo").val(valueArray[2]);
    $("#serialNumberInfo").val(valueArray[3]);
    $("#assignedEmployeeInfo").val(valueArray[5]);
    $("#loggedEmployeeInfo").val(valueArray[7]);
    $("#notesInfo").val(valueArray[8]);

    //if the Edit button inside the View Modal is pressed
    $("#viewModalEditButton").click(function () {
        $("#viewModal").removeClass("fade");
        $("#viewModal").modal("hide");
        editItemSetup(element, id, purchasedate, purchasetime);
        $("#viewModal").addClass("fade");
    });
}

var inputs = [$("#descriptionInput"), $("#categoryInput"), $("#purchase_date_stringInput"), $("#quantityInput")];
function checkRequiredFields() {  
    for (var i = 0; i < inputs.length; i++) {
        console.log(inputs[i].val());
        if (inputs[i].val() === "") {
            inputs[i].css("border-color", "red");
            $("#emptyRequiredErrorIcon").addClass("fa fa-warning");
            $("#emptyRequiredError").text(" Must Fill Out Required Fields ( * )");
        }
        else {
            inputs[i].css("border-color", "");
        }
    }
}
function resetError() {
    
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].css("border-color", "");
    }
    $("#emptyRequiredErrorIcon").removeClass("fa fa-warning");
    $("#emptyRequiredError").text("");
}
// ==================================================== EXPORT MODAL FUNCTIONS ====================================================

var sortBys = ["sortBy", "thenBy1", "thenBy2", "thenBy3", "thenBy4", "thenBy5", "thenBy6", "thenBy7"];
var optionClasses = ["description", "category", "serialNumber", "quantity", "purchaseDate", "assignedEmployee", "loggedDate", "loggedEmployee"];

//Creates the Additional Sort Input Fields and Shows the [-] Button for Exporting -----------------------------------------
var numberOfSorts = 0;
function addSort() {
    manageExportSorts();
    if (numberOfSorts < 7) {
        numberOfSorts++;
        $("#thenBy" + numberOfSorts).show("fast");

        //Loop that finds the next option that isn't disabled - sets the value of the new input to that option
        var i = 0;
        var looper = true;
        while (looper === true) {
            if ($("." + optionClasses[i]).is(":disabled") === false) {                
                $("#thenBy" + numberOfSorts).val(optionClasses[i]);
                looper = false;
            } else {
                i++;
            }
        }
        
        $("#removeSortButton").show("fast");
    }
    checkSorts();
}

//Handles removing the Sort Input Fields and [-] Button for Exporting, Sets the placeholder Excel file name ---------------
function initializeExportModal() {
    if (numberOfSorts === 0) {
        for (var t = 1; t < 8; t++) {
            $("#thenBy" + t).hide();
            $("#thenBy" + t).val("");
        }
    }
    checkSorts();
    $("#dateRangePanelBody").hide();

    $("#exportFilenameInput").val("");
    var date = new Date();
    var currentDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    var amOrPm = date.getHours() <=12 ? "AM" : "PM";
    var currentTime = date.getHours() + "-" + date.getMinutes() +"-"+ date.getSeconds()+"-" + amOrPm;
    $("#exportFilenameInput").attr("placeholder", "Inventory_" + currentDate + "_" + currentTime + ".xlsx");

    manageExportSorts();
}
//Removes a Sort Input ----------------------------------------------------------------------------------------------------
function removeSort() {
    if (numberOfSorts > 0) {
        $("#thenBy" + numberOfSorts).val("");
        $("#thenBy" + numberOfSorts).hide("fast");
        numberOfSorts--;
    }
    checkSorts();
}
//Checks the Sort inputs to manage the [+] and [-] buttons ----------------------------------------------------------------
function checkSorts() {
    if (numberOfSorts == 0) {
        $("#removeSortButton").hide("fast");
    }
    if (numberOfSorts == 7) {
        $("#addSortButton").prop("disabled", "true");
    }
    else {
        $("#addSortButton").removeProp("disabled");
    }
}
//Resets the Export Modal to default when the Export Form is Submitted ----------------------------------------------------
function resetExportModal(){
    $("#exportModal").modal("hide");
    while (numberOfSorts > 0) {
        $("#thenBy" + numberOfSorts).hide();
        numberOfSorts--;
    }
    $("removeSortButton").hide();
    
    if ($("#exportFilenameInput").val() == "") {
        $("#exportFilenameInput").val($("#exportFilenameInput").attr("placeholder"));
    }
}
//Toggles the Visibility of the DateRange Panel on the Export Modal (hidden by default) -----------------------------------
function toggleDateRangePanel() {
    $("#dateRangePanelBody").slideToggle(300, function () {
        $("#dateRangeToggleSpan").toggleClass("glyphicon glyphicon-chevron-up");
        $("#dateRangeToggleSpan").toggleClass("glyphicon glyphicon-chevron-down");
    });
    $('.export-date-picker').datepicker("clearDates");
}
//Disables an option in the Export Modal's Sort-By dropdown if another Sort-By has that value - Re-Enables option if it is available again
function manageExportSorts() {

    var disabledOptions = [];

    for (var i = 0; i < sortBys.length; i++) {
        var sortByVal = $("#" + sortBys[i]).val();
        var sortByVal2 = document.getElementById(sortBys[i]);
        var value = sortByVal2.options[sortByVal2.selectedIndex].value;
        if (sortByVal !== "") {
            $('.' + sortByVal).prop("disabled", "true");
            $("." + sortByVal).css("background-color", "#e6e6e6");
            if (disabledOptions.indexOf(sortByVal) === -1) {
                disabledOptions[disabledOptions.length] = value;
            }
        }
        else {
            for (var j = 0; j < optionClasses.length; j++) {
                if (disabledOptions.indexOf(optionClasses[j]) == -1) {
                    $("." + optionClasses[j]).removeAttr("disabled");
                    $("." + optionClasses[j]).css("background-color", "white");
                }
            }
        }
    }
}
// Enables all the Sort By options so that it can send the value to the controller to export ------------------------------
function enableSortBys() {
    for (var i = 0; i < sortBys.length; i++) {
        $("#" + sortBys[i] + " option").each(function () {
            $(this).removeAttr("disabled");
        })
    }
}
// ================================================================================================================================

// Sets up the Delete Modal when the Table Delete button is pressed -------------------------------------------------------
function tableDeleteSetup(element, id, date, time) {
    var valueArray = new Array();
    $(element).closest("td").siblings().each(function () {
        valueArray.push($(this).text().trim());
    });
    $("#inputModalGlyph").removeClass("fa fa-plus-circle fa-2x");
    $("#inputModalGlyph").addClass("fa fa-edit fa-2x")
    $("#inputModalTitle").text(" Edit Item");
    $("#deleteButton").show();
    $("#inventory_idInput").val(id);

    $("#purchase_date_stringInput").val(date);
    $("#purchase_date_stringInput").datepicker("update", date);
    $("#purchase_time_stringInput").val(time);
    
    $("#descriptionInput").val(valueArray[0]);
    $("#categoryInput").val(valueArray[1]);
    $("#quantityInput").val(valueArray[2]);
    $("#serial_numberInput").val(valueArray[3]);

    $("#assigned_employeeInput").val(valueArray[5]);
    $("#logged_employeeInput").val(valueArray[8]);
    $("#notesInput").val(valueArray[9]);

    $("#confirmModal").modal("show");
}

//Sets a red border alert on the Login page if required inputs are empty --------------------------------------------------
function checkInputFields() {
    if ($("#loginUsernameInput").val() == "") {
        $("#loginUsernameInput").css("border-color", "red");
        $("#emptyInputErrorText").show();
        $("#errorText").hide();
    }
    else {
        $("#loginUsernameInput").css("border-color", "#d9d9d9");
    }
    if ($("#loginPasswordInput").val() == "") {
        $("#loginPasswordInput").css("border-color", "red");
        $("#emptyInputErrorText").show();               
        $("#errorText").hide();
    }
    else {
        $("#loginPasswordInput").css("border-color", "#cccccc");
    }
}

// ==================================================== EDIT PROFILE FUNCTIONS ====================================================

//Sets a red border alert on the Edit Profile page if required inputs are empty -------------------------------------------
function checkEditProfileFields() {
    $(".profileField").each(function (i) {  
        if ($(this).val() === "" ) {
            $(this).css("border", "solid");
            $(this).css("border-width", "thin");
            $(this).css("border-color", "red");
        }
        else {
            $(this).css("border-color", "");
        }
    });
}
//Toggles visibility of the Change Password panel on the Edit Profile page ------------------------------------------------
function togglePasswordPanel() {
    $("#passwordSubpanel").slideToggle(300, function () {
        $("#passwordPanelSpan").toggleClass("fa fa-chevron-up");
        $("#passwordPanelSpan").toggleClass("fa fa-chevron-down");
    })
}
// ================================================================================================================================


//==================================================== DOCUMENT.READY FUNCTIONS ===================================================
$(document).ready(function () {
    
    //instantiate the DataTable
    $("#equipmentTable").DataTable({       
        "columns": [
            null,                       /*Description*/
            null,                       /*Category*/
            { "searchable": false },    /*Quantity*/
            null,                       /*Serial Number*/
            { "searchable": false },    /*purchase date*/
            null,                       /*Assigned Employee*/
            { "searchable": false },    /*Logged Date*/
            //{ "searchable": false },  /*Logged Time*/
            null,                       /*Logged Employee*/
            { "searchable": false },    /*Notes*/
            { "orderable": false }],    /*Button*/
        "scrollX": true
    });

    //instantiate the datepickers
    $('.date-picker').datepicker({
        todayHighlight: true,
        todayBtn: "linked",
        endDate: "0d"
    });
    $('.export-date-picker').datepicker({
        todayHighlight: true,
        todayBtn: "linked"
    })

    $("#newItemButton").click(function () {
        console.log("HERE I AM");
        checkRequiredFields();
    });

    //Sets up the New Item Modal
    $("#modalButton").click(function () {
        newItemSetup();
    });

    //Adds new Sorting Input Fields to the Export Modal
    $("#addSortButton").click(function () {
        addSort();
    })

    //Removes Sorting Input Field from the Export Modal
    $("#removeSortButton").click(function () {
        removeSort();
    })

    //Checks to make sure the [-] needs to be hidden when the Export Modal is opened
    $("#exportButton").click(function () {
        initializeExportModal();
    });
    
    //Resets the Export Modal when the Export Form is submitted
    $("#exportSubmitButton").click(function () {
        enableSortBys();
        resetExportModal();
    });

    //Toggles the optional date-range in the Export modal
    $("#dateRangeToggle").click(function () {
        toggleDateRangePanel();
    });

    //Checks to see if both Login Fields were entered
    $("#loginPanelButton").click(function () {
        checkInputFields();
    });

    //Ensures all non-nullable Profile Fields are not null
    $("#editProfileSubmitButton").click(function () {
        checkEditProfileFields();
    });

    //Toggles the Change Password panel visiblity -- shown by default
    $("#passwordPanelToggleButton").click(function () {
        togglePasswordPanel();
    });

    //disables and re-enables Sort By inputs on the Export Modal
    $(".exportSort").click(function () {
        manageExportSorts();
    });
});
