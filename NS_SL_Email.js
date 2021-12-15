/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/email', 'N/record'],
/**
 * @param {email} email
 * @param {record} record
 */
function(email, record) {
   
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     * @Since 2015.2
     */
    function onRequest(context) {
    	
    	var senderId = -5;
        var recipientEmail = 'jayaram.panchakarla@smarterp.com';
        var timeStamp = new Date().getUTCMilliseconds();
        
        var rec =record.load({
            type:record.Type.SALES_ORDER,
            id:178506 
        });
        log.debug("record",rec);
        //var rec_id= context.newRecord.getText( { fieldId: 'id' } );
        rec.selectLine({
            sublistId: "item",
            line: 0
        });
        rec.setCurrentSublistValue({sublistId:"item",fieldId:"quantity",value:5});
        var recipientId = rec.save();
        
        email.send({
            author: senderId,
            recipients:"jayaram.panchakarla@smarterp.com",
            subject: 'Test Sample Email Module',
            body: 'email body',
            RelatedRecords: {
            	 entityId: recipientId}
            
        });
        log.debug("email sent");
        log.debug(recipientId);


    }

    return {
        onRequest: onRequest
    };
    
});
