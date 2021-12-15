/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record','N/email'],
/**
 * @param {record} record
 */
function(record,email) {
   
    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type
     * @param {Form} scriptContext.form - Current form
     * @Since 2015.2
     */
    function beforeLoad(scriptContext) {
    	
    	
    	/*
    	 var SOrec =record.load({
            type:record.Type.SALES_ORDER,
            id:178506,
            isDynamic: true
          
            
        });
    	 var date=SOrec.getText({fieldId : 'trandate'});
    	log.debug(date);
    	var itemsublist=SOrec.getSublistValue({
            sublistId: 'item',
            fieldId: 'description',
            line: 0
        });
    	var itemname=SOrec.getSublistValue({
            sublistId: 'item',
            fieldId: 'itemtype',
            line: 0
        });
    	var quantity=SOrec.getSublistValue({
            sublistId: 'item',
            fieldId: 'quantity',
            line: 0
        });
    		
    	log.debug(itemsublist);
    	log.debug(itemname);
    	log.debug(quantity);
    	
    	//sending email
    	
    	var senderId = -5;
        var recipientEmail = 'jayaram.panchakarla@smarterp.com';
        var timeStamp = new Date().getUTCMilliseconds();
        
        
        
        email.send({
            author: senderId,
            recipients: rec_id,
            subject: 'Test Sample Email Module',
            body: 'email body',
            relatedRecords: {
                entityId: rec_Id,
                     
            }
        });*/
        




    	
    	
    	

    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function beforeSubmit(scriptContext) {
    	
    	require(['N/search'], function(search) {
    	    var mySearch = search.create({
    	        type: search.Type.ITEM,
    	        columns: ['internalid'],
    	        filters: []
    	    });

    	    var myResultSet = mySearch.run();

    	   myResultSet .each(entry)
    		
    	function entry(result){	
    		log.debug('resultSet returned', result.length + ' records returned')
    		return true;
    	}
    	});


    	

    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function afterSubmit(scriptContext) {
    	
    	/*if(scriptContext.Type !== scriptContext.UserEventType.CREATE){
    		var rec_id= scriptContext.newRecord.getText( { fieldId: 'id' } );
    		log.debug("id",rec_id);

    	var rec =record.load({
            type:record.Type.SALES_ORDER,
            id:178506 
        });
    	
    	
    	var e=rec.selectNewLine({sublistId:"item"});
    	
    	rec.setCurrentSublistValue({sublistId:"item",fieldId:"item",value:715});
    	rec.setCurrentSublistValue({sublistId:"item",fieldId:"quantity",value:5});
    	rec.commitLine({sublistId:"item"});
    	rec.save
    	}*/
    	log.debug("email started");
    	var senderId = -5;
    	
    	 var recipientEmail = 'jayaram.panchakarla@smarterp.com';
    	 
    	 var timeStamp = new Date().getUTCMilliseconds();
    	 
    	 var recipient = record.load({
             type:record.Type.SALES_ORDER,
             id:178506 
         });
    	 
    	 log.debug(recipient);

        var rec_id= scriptContext.newRecord.getValue( { fieldId: 'id' } );
        
        log.debug(rec_id);
        email.send({
            author: senderId,
            recipients:178506,
            subject: 'Test Sample Email Module',
            body: 'email body',
            
        });
        log.debug("email sent");
    }
    
    	


    return {
       // beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
      afterSubmit: afterSubmit
    };
    
});
