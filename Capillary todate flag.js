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
	
	var exports = {};
    function beforeLoad(scriptContext) {
    	if(scriptContext.type == scriptContext.UserEventType.VIEW){
    	 var objRecord = scriptContext.newRecord;
		 var date=recObj.getValue({fieldId:'trandate'});
		 var date_now = new Date(11/24/2021);
		 date=new Date(date);
if(date.getTime()>date_now.getTime){		 
		  var name=objRecord.setValue({fieldId:'custbody_today_print'});
    	}
		}
     

    }

   
    exports.beforeLoad = beforeLoad;
    return exports;
    
});
