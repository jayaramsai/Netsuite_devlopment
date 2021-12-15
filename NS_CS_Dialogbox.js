/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/ui/dialog','N/format'],
/**
 * @param {dialog} dialog
 */
function(dialog,format) {
    
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
    	return true

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
    	rec=scriptContext.currentRecord;
       	// validating account number
       	 if (scriptContext.fieldId == 'custpage_account_number') {
     		 var number = rec.getText({
                 fieldId: 'custpage_account_number'
             });
       		       		       		
       	 var patt1 = /[a-zA-Z@#$%^&*-+]/g; 
         var result = number.match(patt1);
       		if( result ||number.length > 6)
       			 {  
       			rec.setValue({fieldId: 'custpage_account_number', value:''})
       			dialog.alert({
    		            title: 'Account Number Not Correct',
    		            message: 'Plese enter correct account number'
    		        });
       			return false;
       			}
       	 }
       	 
       	 // validating bank name
     	 if (scriptContext.fieldId == 'custpage_b_name') {
     		 var bank_account_name = rec.getText({
                 fieldId: 'custpage_b_name'
             });
       		       		       		
       	 var patt1 = /[0-9@#$%^&*-+]/g; 
         var result = bank_account_name.match(patt1);
       		if( result || bank_account_name.length > 15)
       			 {  
       			rec.setValue({fieldId: 'custpage_b_name', value:''})
       			dialog.alert({
    		            title: 'Bank Account Name Not Correct',
    		            message: 'Plese enter correct Bank Account Name'
    		        });
       			return false;
       			}
       	 }
     	 
     	 // validating bank number
     	 if (scriptContext.fieldId == 'custpage_bank_number') {
     		 var bank_number = rec.getText({
                 fieldId: 'custpage_bank_number'
             });
       		       		       		
       	 var patt1 = /[a-zA-Z@#$%^&*-]/g; 
         var result = bank_number.match(patt1);
       		if( result || bank_number.length >5)
       			 {  
       			rec.setValue({fieldId: 'custpage_bank_number', value:''})
       			dialog.alert({
    		            title: 'Bank Number Not Correct',
    		            message: 'Plese enter correct Bank Number'
    		        });
       			return false;
       			}
       	 }
       	   return true; //Return true to continue with the change

    	

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

    }

    return {
       // pageInit: pageInit,
        fieldChanged: fieldChanged,
        /*postSourcing: postSourcing,
        sublistChanged: sublistChanged,*/
       // lineInit: lineInit,
        validateField: validateField,
        /*validateLine: validateLine,
        validateInsert: validateInsert,
        validateDelete: validateDelete,
        saveRecord: saveRecord*/
    };
    
});
