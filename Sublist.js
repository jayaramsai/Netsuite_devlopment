/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([],

function() {
    
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

    	//var Rec = scriptContext.currentRecord;
    	
    	/*//header
    	//console.log(itemReceiptRec.getText('location'));
    	
    	//Sublist line count
    	var LineCount = Rec.getLineCount({
    		sublistId: 'addressbook '
    	});
    	
    	console.log('addressbook ', LineCount);
    	
    	//select line in Sublist
    	var itemLine = itemReceiptRec.selectLine({
			 sublistId: 'addressbook ',
			 line: 0
			});
    	
    	//Sublist Field value - for selected line 
    	var curItemLine_loc = itemLine.getCurrentSublistValue({
			 sublistId: 'addressbook',
			 fieldId: 'addrtext'
			});
    	
    	console.log('curItemLine', curItemLine_loc);
    	
    	//sublist line subrecord - returns Record (subrecord) for current selected line
    	var curItemLine_invDetail = itemLine.getCurrentSublistSubrecord({
			 sublistId: 'item',
			 fieldId: 'inventorydetail'
			});
   	
    	console.log('curItemLine_invDetail', JSON.stringify(curItemLine_invDetail));
    	
    	console.log(curItemLine_invDetail.getValue('location'));
    	
    	//Sublist subrecord sublist line count
    	var subRecSublistLineCount = curItemLine_invDetail.getLineCount('inventoryassignment');
    	
    	console.log('subRecSublistLineCount', subRecSublistLineCount);
    	
    	//select sublist subrecord sublist line 0
    	var subRecSublistLine0 = curItemLine_invDetail.selectLine({
			 sublistId: 'inventoryassignment',
			 line: 0
			});
    	
    	//sublist subrecord sublist line 0 field value (column)
    	var binNumber = subRecSublistLine0.getCurrentSublistValue({
    		sublistId: 'inventoryassignment',
    		fieldId: 'binnumber'	
    	});
    	
    	console.log('BinNumber', binNumber);
    	
    	*/
    	

    	
    	//Sublist
//    	var itemExpensesSL = itemReceiptRec.getLineCount({
//    		sublistId: 'expense'
//    	});
//    	
//    	console.log('Expense Line Count', itemExpensesSL);
    	
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
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        postSourcing: postSourcing,
        sublistChanged: sublistChanged,
        lineInit: lineInit,
        validateField: validateField,
        validateLine: validateLine,
        validateInsert: validateInsert,
        validateDelete: validateDelete,
        saveRecord: saveRecord
    };
    
});
