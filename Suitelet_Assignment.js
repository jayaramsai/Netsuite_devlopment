/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/ui/dialog', 'N/ui/message', 'N/ui/serverWidget','N/record','N/redirect','N/runtime'],
/**
 * @param {dialog} dialog
 * @param {message} message
 * @param {serverWidget} serverWidget
 */
function(dialog, message, serverWidget,record,redirect,runtime) {
   
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     * @Since 2015.2
     */
    function onRequest(context) {
    	
    
    	if (context.request.method === 'GET') 
    	{   
    		
    	var form = serverWidget.createForm({
    		 title: 'Bank Details'
    		 });
    	
    	
    	
    	var Name = form.addField({
    		 id: 'custpage_name',
    		 type: serverWidget.FieldType.TEXT,
    		 label: 'Name',
    		
    		 });
    	Name.isMandatory = true;
    	
    	var inactive = form.addField({
            "id": "custpage_inactive",
            "type": serverWidget.FieldType.CHECKBOX,
            "label": "Inactive"
        });
    	
    		
    		 
    	var BName= form.addField({
    		 id: 'custpage_b_name',
    		 type: serverWidget.FieldType.TEXT,
    		 label: 'BANK ACCOUNT NAME'
    		 });
    		 BName.isMandatory = true;
    		 
    		 
    	var FFormat=form.addField({
    		 id: 'custpage_p_file_format',
    		 type: serverWidget.FieldType.SELECT,
    		 label: 'PAYMENT FILE FORMAT'
    		 });
    	     
    	FFormat.addSelectOption({
   		 value: 'ABA',
   		 text: 'ABA'
   		 });
   		 
    	FFormat.addSelectOption({
   		 value: 'ABO',
   		 text: 'ABO'
   		 });
    	FFormat.defaultValue = 'Insert Text Here.';
    	
    	
    	FFormat.isMandatory = true;
    	
    	var Account_Number = form.addField({
      		 id: 'custpage_account_number',
      		 type: serverWidget.FieldType.TEXT,
      		 label: 'BANK ACCOUNT NUMBER '
      		 });
    	Account_Number.isMandatory = true;
    		 
    		 var BNumber = form.addField({
    		 id: 'custpage_bank_number',
    		 type: serverWidget.FieldType.TEXT,
    		 label: 'BANK NUMBER'
    		 });
    		 BNumber.isMandatory = true;
    		 
    		 
    		 
        var Type=form.addField({
        		 id: 'custpage_type',
        		 type: serverWidget.FieldType.SELECT,
        		 label: 'Type'
        		 });
        	     
        	Type.addSelectOption({
       		 value: 'Primary',
       		 text: 'Primary'
       		 });
       		 
        	Type.addSelectOption({
       		 value: 'Secondary',
       		 text: 'Secondary'
       		 });
        	Type.isMandatory = true;	 
    		 
    		
        	var Branch_Number = form.addField({
       		 id: 'custpage_branch_number',
       		 type: serverWidget.FieldType.TEXT,
       		 label: 'BRANCH NUMBER'
       		 });
        	Branch_Number.isMandatory = true;
        	
        	var Payment_Description = form.addField({
          		 id: 'custpage_bank_account_payment_description',
          		 type: serverWidget.FieldType.TEXT,
          		 label: 'BANK ACCOUNT PAYMENT DESCRIPTION'
          		 });
        	
        	form.addSubmitButton({
        		 label : 'Submit Button'
        		});
        	form.addResetButton({
        		 label : 'Reset Button'
        		});
        	

        	//form.setScript('customscript_ns_cs_hello');
        	//form.clientScriptFileId = 12397;
        	form.clientScriptModulePath = 'SuiteScripts/SMARTERP/FileCabinet/SuiteScripts/NS_CS_Dialogbox.js';
        	//SuiteScripts/SMARTERP/FileCabinet/SuiteScripts/NS_CS_Hello.js
    			 context.response.writePage(form);


    }
    	else{
    		
    		// fetching data
    		var Name = context.request.parameters.custpage_name;
    		var BName = context.request.parameters.custpage_b_name;
    		var FFormat = context.request.parameters.custpage_p_file_format;
    		var Account_Number = context.request.parameters.custpage_account_number;
    		var BNumber = context.request.parameters.custpage_bank_number;
    		var Type = context.request.parameters.custpage_type;
    		var Branch_Number = context.request.parameters.custpage_branch_number;
    		var Payment_Description = context.request.parameters.custpage_bank_account_payment_description;
    		
    		//loging data
    		log.debug(Name);
    		log.debug(BName);
    		log.debug(FFormat);
    		log.debug(Account_Number);
    		log.debug(Type);
    		log.debug(Branch_Number);
    		log.debug(FFormat);
    		log.debug(Payment_Description);
    		
    		
    		
    		
    		var bank_details = record.create({
    			 type: 'customrecord_2663_entity_bank_details',
    			 isDynamic: true
    			 });
    		
    		
    		// setting data to record
    		
    	     var userRole = runtime.getCurrentUser();

    		bank_details.setValue({
                fieldId: 'custrecord_2663_parent_employee',
                value: userRole.id
            });
    		
    		bank_details.setValue({
                fieldId: 'name',
                value: Name
            });
    		bank_details.setValue({fieldId: 'custrecord_2663_entity_acct_name', value: BName});
    		bank_details.setValue({fieldId: 'custpage_2663_entity_file_format', value: FFormat});
    		bank_details.setValue({fieldId: 'custrecord_2663_entity_bank_no', value: BNumber});
    		bank_details.setValue({fieldId: 'custrecord_2663_entity_bank_type', value: 1});
    		bank_details.setValue({fieldId: 'custrecord_2663_entity_acct_no', value: Account_Number});
    		bank_details.setValue({fieldId: 'custrecord_2663_entity_branch_no', value: Branch_Number});
    		bank_details.setValue({fieldId: 'custrecord_2663_entity_payment_desc', value: Payment_Description});


    		
    		var recid=bank_details.save({enableSourcing: true, ignoreMandatoryFields: true});
        	log.debug(recid);
        	
    	}
    }  	

    return {
        onRequest: onRequest
    };
    
});
