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
     */
    function onRequest(context) {
    	
    	try{
    	var order=record.load({
    		type:record.Type.SALES_ORDER,
    		id:178506
    		});
    	var id=order.getValue({fieldId:'entity'});
    	var mail=order.getValue({fieldId:'email'});
    	

    	log.debug('sales order',order);
    	return context.response.write(
    			 JSON.stringify(id+mail)
    	 );
    	}
    	catch(e) {
    		log.debug(e.message);
    	}

    }

    return {
        onRequest: onRequest
    };
    
});
