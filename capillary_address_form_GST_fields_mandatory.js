/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/runtime', 'N/log'],

function(record, search, runtime, log) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {

    }

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(scriptContext) {
    	
    	var currentRecord = scriptContext.currentRecord;
        var recordType = currentRecord.type;
           
            var country = currentRecord.getValue("country");
            var type = currentRecord.getValue("custrecord_gst_registration_type");
			console.log("country"+country);
            if (country=='IN') {
              	
              	if(type==4){
            	console.log("type"+type);				
				var stateFieldObj = currentRecord.getValue({fieldId: 'custrecord_gst_addressstatecode'});
				var gstcode= currentRecord.getField({
             	   fieldId: 'custrecord_gst_addressstatecode'
             	  });
             	  gstcode.isMandatory=false;
				  gstcode.isDisabled=true;
				var gstnumber= currentRecord.getField({
	             	   fieldId: 'custrecord_gst_nocustomeraddr'
	             	  })
	             	  gstnumber.isMandatory=false;
					  gstnumber.isDisabled = true;
            }
              	else{
              		var gstcode= currentRecord.getField({
                  	   fieldId: 'custrecord_gst_addressstatecode'
                  	  })
                  	  gstcode.isMandatory=true;
					  gstcode.isDisabled=false;
                  	var gstnumber= currentRecord.getField({
 	             	   fieldId: 'custrecord_gst_nocustomeraddr'
 	             	  })
 	             	  gstnumber.isMandatory=true;
					  gstnumber.isDisabled=false;
              	}
            }
            var state = currentRecord.getValue("state");
            if (state != '' && state != null && state != undefined && state != 'undefined') {
                stateCodeId = getStateCode(state); //function call:To get the state code from custom record using filter
                console.log('statecode',stateCodeId);
                currentRecord.setValue({
                    fieldId: 'custrecord_gst_addressstatecode',
                    value: stateCodeId,
                    ignoreFieldChange: true,
                    fireSlavingSync: true
                });
    			
    			 currentRecord.getField({
             	   fieldId: 'custrecord_gst_addressstatecode'
             	  }).isDisabled = true;
            }
            
    	

    
    }

    /**
     * Function to be executed when field is slaved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     *
     * @since 2015.2
     */
    function postSourcing(scriptContext) {
    	
    }

    /**
     * Function to be executed after sublist is inserted, removed, or edited.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function sublistChanged(scriptContext) {

    }

    /**
     * Function to be executed after line is selected.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function lineInit(scriptContext) {

    }

    /**
     * Validation function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @returns {boolean} Return true if field is valid
     *
     * @since 2015.2
     */
    function validateField(scriptContext) {

    }

    /**
     * Validation function to be executed when sublist line is committed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateLine(scriptContext) {

    }

    /**
     * Validation function to be executed when sublist line is inserted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateInsert(scriptContext) {

    }

    /**
     * Validation function to be executed when record is deleted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateDelete(scriptContext) {

    }

    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @returns {boolean} Return true if record is valid
     *
     * @since 2015.2
     */
    function saveRecord(scriptContext) {
    	var stateCodeId;
        var currentRecord = scriptContext.currentRecord;
        var recordType = currentRecord.type;
        var state = currentRecord.getValue("state");
        var gstNumber = currentRecord.getValue("custrecord_gst_nocustomeraddr");
		var gstNoCount = gstNumber.length;

		if(gstNumber){
			if(gstNoCount < 15)
			{
				alert("GST Number should not be less than 15 numbers.");
				return false;
			}
			else{
				return true;
			}
		}

        if (recordType == "address") {
            if (state != '' && state != null && state != undefined && state != 'undefined') {
                stateCodeId = getStateCode(state);
                var gstNo = currentRecord.getValue("custrecord_gst_nocustomeraddr");
                if (gstNo == null || gstNo == '') {
                    return true;
                } else {
                    var locationGstNumber = gstNo.toString();
                    var locationGstNumber = locationGstNumber.substr(0, 2);


                    var strStateCode = stateCodeId;

                    if (strStateCode < 10) {
                        //return ("0" + strStateCode);
						var stCode = ("0" + strStateCode);
                    }
					else{
						var stCode = strStateCode;
					}
                    if (locationGstNumber!= stCode) {
                        alert("The state code mentioned in GSTIN number does not match with the state code of the selected state. Please check and correct.")
                        return false;
                    } else {
                        return true;
                    }
                }
                return true;
            } else {
                alert("Please select state");
                return false;
            }
        } else {
            return true;
        }

    }
    function getStateCode(state) {
        var stateCode = '';
        var createSearch = search.create({
            type: 'customrecord_gst_state_abbreviation',
            columns: [{
                    name: 'internalid'
                },
                {
                    name: 'custrecord_gst_state_code'
                }
            ],

            filters: [{
                name: 'custrecord_gst_state_abbreviation',
                operator: 'is',
                values: state
            }]
        });

        var searchResult = createSearch.run().getRange({
            start: 0,
            end: 50
        });
        if (searchResult.length != null && searchResult.length != '' && searchResult.length > 0) {
            stateCode = searchResult[0].getValue({
                name: 'custrecord_gst_state_code'
            });
        }
        return stateCode;
    }


    return {
       // pageInit: pageInit,
        fieldChanged: fieldChanged,
       /* postSourcing: postSourcing,
        sublistChanged: sublistChanged,
        lineInit: lineInit,
        validateField: validateField,
        validateLine: validateLine,
        validateInsert: validateInsert,
        validateDelete: validateDelete,*/
        saveRecord: saveRecord
    };
    
});