/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record',],

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
    	
    	
    	rec=record.load({
    		type:"customer",
    		id:8703,
    		isDynamic:true
    	})
    	var name = rec.getValue('entityid');
    	log.debug(name);
    	
    	var email=rec.getValue('defaultaddress');
    	log.debug(email);
    	
    	var u=rec.setValue({fieldId:'companyname',value:'smarterp'});
    	log.debug("record",u);
    	
    	var v=rec.setValue({fieldId:'email',value:'jay@gmail.com'});
    	log.debug(v);
    	rec.selectNewLine({
            sublistId: 'addressbook'
        });
    	
    	rec.setCurrentSublistValue({
            sublistId: 'addressbook',
            fieldId: 'isresidential',
            value: true
        });
    	
    	var subrec = rec.getCurrentSublistSubrecord({
            sublistId: 'addressbook',
            fieldId: 'addressbookaddress'
        });
    	
    	  	
    	
    	
    	subrec.setValue({
            fieldId: 'country',
            value: 'US'
        });

        subrec.setValue({
            fieldId: 'city',
            value: 'San Mateo'
        });

        subrec.setValue({
            fieldId: 'state',
            value: 'CA'
        });

        subrec.setValue({
            fieldId: 'zip',
            value: '94403'
        });

        subrec.setValue({
            fieldId: 'addr1',
            value: '2955 Campus Drive'
        });

        subrec.setValue({
            fieldId: 'addr2',
            value: 'Suite 100'
        });
        rec.commitLine({
            sublistId: 'addressbook'
        });
        
    	var recID=rec.save()

    }

    return {
        //beforeLoad: beforeLoad,
        //beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});
