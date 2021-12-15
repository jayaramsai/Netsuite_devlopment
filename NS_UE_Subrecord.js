/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record'],
/**
 * @param {record} record
 */
function(record) {
	
	
	
	
   
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
    	return true;

    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2   9810
     */
    function beforeSubmit(scriptContext) {
    	//log.debug("before submit");
    	

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
    	
    	if(scriptContext.Type !== scriptContext.UserEventType.CREATE){
    		var cus_id= scriptContext.newRecord.getText( { fieldId: 'id' } );
    		log.debug("id",cus_id);

    	var customerRec = record.load({
            type: "customer",
            id:cus_id,
            isDynamic: true
        });

        customerRec.selectLine({
            sublistId: "addressbook",
            line: 0
        });

        var myaddressSubrecord = customerRec.getCurrentSublistSubrecord({
            sublistId: "addressbook",
            fieldId: "addressbookaddress"
        });

        myaddressSubrecord.setValue({
            fieldId: "country",
            value: "IN"
        })

        myaddressSubrecord.setValue({
            fieldId: "city",
            value: "Eluru-tou"
        });

        customerRec.commitLine({
            sublistId: "addressbook"
        });

        customerRec.save({
            enableSourcing: false,
            ignoreMandatoryFields: true
        });
        
        customerRec.selectNewLine({
        	sublistId : "addressbook"
        	});
        var myaddressSubrecord = customerRec.getCurrentSublistSubrecord({
        	sublistId : "addressbook",
        	fieldId : "addressbookaddress"
        	});

        	myaddressSubrecord.setValue({
        	fieldId : "country",
        	value : "IN"
        	})

        	myaddressSubrecord.setValue({
        	fieldId : "city",
        	value : "vizag" 
        	});
        	
        	myaddressSubrecord.setValue({
            	fieldId : "addrphone",
            	value : "837061242" 
            	});
        	
        	myaddressSubrecord.setValue({
            	fieldId : "addr1",
            	value : "near tower" 
            	});
            	
            	myaddressSubrecord.setValue({
                	fieldId : "addr2",
                	value : "house" 
                	});
            	myaddressSubrecord.setValue({
                	fieldId : "state",
                	value : "ts" 
                	});
            	
            	
            	


        	customerRec.commitLine({
        	sublistId : "addressbook"
        	});
        	customerRec.save({
                enableSourcing: false,
                ignoreMandatoryFields: true
            });

        	//var recordId=customerRec.save(
        	
        	//);
        	//enableSourcing : false,
        	//ignoreMandatoryFields : true

    	
    	
    	}

    	

    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});
