/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/record','N/ui/serverWidget','N/redirect'],
/**
 * @param {record} record
 * @param {runtime} runtime
 * @param {serverWidget} serverWidget
 */
function(record,ui,redirect) {
   
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     * @Since 2015.2
     */
    function onRequest(context) {
    	
    	if (context.request.method === 'GET') {
            var form = ui.createForm({
                title: 'Employee search based on Id'
            });
            var ename = form.addField({
                id: 'ename',
                type: ui.FieldType.TEXT,
                label: 'Employee ID'
            });
            
            form.addSubmitButton({
                label: 'Get details'
            });
            
            context.response.writePage(form);
    	}
    	else
    		{
    		log.debug("record redirect start");
    		var id1= context.request.parameters.ename;
    		log.debug(id1);
    		
    		redirect.toRecord({
    			 type: record.Type.EMPLOYEE,
    			 email: id1
    			 });

    		
    		/*context.response.sendRedirect({
    			 type: http.RedirectType.RECORD,
    			 identifier: record.Type.EMPLOYEE,
    			 parameters: ({email:id})
    			 });*/
    		log.debug("record redirect end");
    		}

    }

    return {
        onRequest: onRequest
    };
    
});
