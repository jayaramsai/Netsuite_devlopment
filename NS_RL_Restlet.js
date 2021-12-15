/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */
define(['N/record'],
/**
 * @param {record} record
 */
function(record) {
   
    /**
     * Function called upon sending a GET request to the RESTlet.
     *
     * @param {Object} requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
     * @since 2015.1
     */
    function doGet(requestParams) {
    	
    	var employeeId = requestParams.id;
    	
    	log.audit('ID', employeeId);
    	
    	var record_employee = record.load({
    		type: record.Type.EMPLOYEE,
    		id: employeeId
    	});
    	
    	var firstName = record_employee.getValue({
    		fieldId: 'firstname'
    	});
    	
    	var lastName = record_employee.getValue({
    		fieldId: 'lastname'
    	});
    	
    	var email = record_employee.getValue({
    		fieldId: 'email'
    	});
    	
    	var phone = record_employee.getValue({
    		fieldId: 'mobilephone'
    	});
    	
    	
    	//build the response
    	//var response = new Object();
    	var response = {};
    	
    	response["firstName"] = firstName;
    	response["lastName"] = lastName;
    	response["email"] = email;
    	response["phone"] = phone;
    	
    	return response;
    	
    	
    }

    /**
     * Function called upon sending a PUT request to the RESTlet.
     *
     * @param {string | Object} requestBody - The HTTP request body; request body will be passed into function as a string when request Content-Type is 'text/plain'
     * or parsed into an Object when request Content-Type is 'application/json' (in which case the body must be a valid JSON)
     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
     * @since 2015.2
     */
    function doPut(requestBody) {

    }


    /**
     * Function called upon sending a POST request to the RESTlet.
     *
     * @param {string | Object} requestBody - The HTTP request body; request body will be passed into function as a string when request Content-Type is 'text/plain'
     * or parsed into an Object when request Content-Type is 'application/json' (in which case the body must be a valid JSON)
     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
     * @since 2015.2
     */
    function doPost(requestBody) {
    	
    	var firstName = requestBody.firstName;
    	var lastName = requestBody.lastName;
    	var email = requestBody.email[0].item;
    	return email
    	
    	
    	/*//record creation
    	
    	var record_employee = record.create({
    		type: record.Type.EMPLOYEE,
    		isDynamic: true
    	});
    	
    	//first name
    	record_employee.setValue({
    		fieldId: 'firstname',
    		value: firstName
    	});
    	
    	//lastname
    	record_employee.setValue({
    		fieldId: 'lastname',
    		value: lastName
    	});
    	
    	//lastname
    	record_employee.setValue({
    		fieldId: 'email',
    		value: email
    	});
    	
    	//lastname
    	record_employee.setValue({
    		fieldId: 'subsidiary',
    		value: 14
    	});
    	
    	return {
    			id: record_employee.save()
    		   }*/
    	
    }

    /**
     * Function called upon sending a DELETE request to the RESTlet.
     *
     * @param {Object} requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
     * @since 2015.2
     */
    function doDelete(requestParams) {

    }

    return {
        'get': doGet,
        put: doPut,
        post: doPost,
        'delete': doDelete
    };
    
});