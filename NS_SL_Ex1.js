/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget', 'N/record', 'N/redirect'],
/**
 * @param {serverWidget} serverWidget
 * @param {record} record
 * @param {redirect} redirect
 */
function(serverWidget, record, redirect) {
   
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     * @Since 2015.2
     */
    function onRequest(context) {
    	var request = context.request;
    	var response = context.response;
    	
    	if(request.method == 'GET'){
    		
    	// reading the params
    	var firstName = request.parameters.ev_name;
    	var residentStatus = request.parameters.ev_resident_status;
    	var empId = request.parameters.ev_emp_id;
    	
    	var form = serverWidget.createForm({
    		title : 'Update Employee Notes',
    		//hideNavBar : true
    	});
    	
    	var nameFld = form.addField({
    		id : 'custpage_sdr_name',
    		type : serverWidget.FieldType.TEXT,
    		label : 'Name'
    	});
    	var notesFld = form.addField({
    		id : 'custpage_sdr_notes',
    		type : serverWidget.FieldType.TEXTAREA,
    		label : 'Notes'
    	});
    	var emplIdFld = form.addField({
    		id : 'custpage_sdr_empid',
    		type : serverWidget.FieldType.TEXT,
    		label : 'Employee Id'
    	});
    	
    	nameFld.updateDisplayType({
    		displayType : serverWidget.FieldDisplayType.INLINE
    	});
    	emplIdFld.updateDisplayType({
    		displayType : serverWidget.FieldDisplayType.HIDDEN
    	});
    	
    	// setting value to the fields
    	nameFld.defaultValue = firstName;
    	notesFld.defaultValue = empId;
    	
    	form.addSubmitButton('Continue');  // this also return a field object
    	
    	response.writePage(form);
    	
    }else{ //POST // In JS there is no scope level variable
    	
    	//read value from the suitelet page
    	firstName = request.parameters.custpage_sdr_name;
    	
    	
    	var employee = record.load({
    		type : record.Type.EMPLOYEE,
    		id : request.parameters.custpage_sdr_notes
    	});
    	employee.save();
    	redirect.toRecord({
    		type : record.Type.EMPLOYEE,
    		id : empId
    	});
    }
    }

    return {
        onRequest: onRequest
    };
    
});