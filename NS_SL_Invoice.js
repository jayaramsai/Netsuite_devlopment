/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/record'],
/**
 * @param {record} record
 */
function(record) {
   
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     * @Since 2015.2
     * 178509
     */
    function onRequest(context) {
    	var invoice = record.create({type: 'invoice', isDynamic: true});
    	invoice.setValue({fieldId: 'entity', value: 7022});
    	//invoice.setValue({fieldId: 'location', value: 3});
    	invoice.selectNewLine({sublistId: 'item'});
    	    invoice.setCurrentSublistValue({
    	        sublistId: 'item',
    	        fieldId: 'item',
    	        value:1008,
    	        ignoreFieldChange: true
    	    });
    	    log.debug('record created');
    	    invoice.setCurrentSublistValue({
    	        sublistId: 'item',
    	        fieldId: 'quantity',
    	        value: 2,
    	        ignoreFieldChange: true
    	    });
    	    invoice.setCurrentSublistValue({
    	        sublistId: 'item',
    	        fieldId: 'amount',
    	        value: 55,
    	        ignoreFieldChange: true
    	    });
    	    invoice.setCurrentSublistValue({
    	        sublistId: 'item',
    	        fieldId: 'taxcode',
    	        value:-7,
    	        ignoreFieldChange: true
    	    });
    	    
    	invoice.commitLine({sublistId: 'item'});
    	
    	var id=invoice.save({enableSourcing: true, ignoreMandatoryFields: true});
    	log.debug(id);


    }

    return {
        onRequest: onRequest
    };
    
});
