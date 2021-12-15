/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define([],

function() {
   
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
     * @Since 2015.2
     */
    function beforeSubmit(scriptContext) {
    	//scriptContext.newRecord.setValue({fieldId : "mobilephone", value: "1234567890"});
    	//scriptContext.newRecord.setValue({fieldId : "phone", value: "1234567890"});
    	/*var employee = scriptContext.newRecord;
    	var employeeOld = scriptContext.oldRecord;

    	if(scriptContext.Type == scriptContext.UserEventType.CREATE){
    		
    		
    		   		
    		//setting comments if its empty
    		var commentsField = employee.getText( { fieldId: 'comments' } );
     		var t=util.isString(commentsField);  		
    		if(t){
    			employee.setValue({fieldId : "comments", value: "New to Netsuite"});
    			    			
    		}
    		
    		//setting job title 		
    		
    		var jobTitle=employee.getText( { fieldId: 'title' } );
    		var isEmpty=util.isString(jobTitle);
    		if(isEmpty){
    			employee.setValue({fieldId : "title", value: "learner"});
    		}
    		
    		//defaultaddress
    		var address=employee.getText( { fieldId: 'defaultaddress' } );
    		var adressEmpty=util.isString(address);
    		if(adressEmpty){
    			employee.setValue({fieldId : "defaultaddress", value: " Pleasanton, California, United States"});
    			//log.debug("address",employee.getValue('defaultaddress'))
    		}
    		
    		//var objSublist = currentRecord.getSublist({sublistId: 'item'});
        	
    	}
    	else{
    		
    		employee.insertLine({
          		 sublistId:'addressbook ',
          		 line:0
          	 });
          	  
    		employee.setSublistValue({
            		sublistId: 'addressbook',
            		fieldId: 'city',
            		line:0,
            		value: "ramapuram" });
    		log.debug("city");
    		
    		
    		// email changed
    		var oldemail = employeeOld.getValue({fieldId : "email"});
        	var newemail = employee.getValue({fieldId : "email"});
        	
        	if(oldemail != newemail){
        		log.debug("email changed",newemail);
        	}
        	else log.debug("email not changed");
        	
        	//jobtitle changed
        	
        	var oldjobTitle=employee.getText( { fieldId: 'title' } );
        	var newjobtitle=employeeOld.getText( { fieldId: 'title' } );
        	if(oldjobTitle != newjobtitle){
        		log.debug("jobtitle changed",newjobtitle);
        	}
        	else log.debug("jobTitle not changed");
        	
        	//address changed
        	
        	
        	var s=employee.getText({
    			sublistId:'addressbook',
    			fieldId:'city',
    			line:0  			
    		});
        	var l=employeeOld.getText({
    			sublistId:'addressbook',
    			fieldId:'city',
    			line:0  			
    		});
        	log.debug(s);
        	if(s==l){
        		log.debug('sublist same',s);
        	}
        	else log.debug("sublist not changed",l);
    		
    	}
    	return true;
*/
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
    	var employee = scriptContext.newRecord;
    	var employeeid = employee.getValue('entityid');
    	var supervisor = employee.getValue('supervisor');
    	
    	log.debug('Employee ID:',employeeid);
    	log.debug('Supervisor Name:',supervisor);
    	return true;

    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});
