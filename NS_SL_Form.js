/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */

// this creates a Suitelet form that lets you write and send an email

define(['N/ui/serverWidget', 'N/email', 'N/runtime','N/record'],
    function(ui, email, runtime,record) {
        function onRequest(context) {
            if (context.request.method === 'GET') {
                var form = ui.createForm({
                    title: 'Email ex'
                });
                var subject = form.addField({
                    id: 'subject',
                    type: ui.FieldType.TEXT,
                    label: 'Subject'
                });
                subject.layoutType = ui.FieldLayoutType.NORMAL;
                subject.breakType = ui.FieldBreakType.STARTCOL;
                subject.isMandatory = true;
                
                var subject1 = form.addField({
                    id: 'subject1',
                    type: ui.FieldType.TEXT,
                    label: 'Subject1'
                });
                var recipient = form.addField({
                    id: 'recipient',
                    type: ui.FieldType.EMAIL,
                    label: 'Recipient email'
                });
                recipient.isMandatory = true;
                var message = form.addField({
                    id: 'message',
                    type: ui.FieldType.TEXTAREA,
                    label: 'Message'
                });
                
                
                   message.displaySize = {
                    width: 60,
                    height: 10
                };
                form.addSubmitButton({
                    label: 'Send Email'
                });
                context.response.writePage(form);
                log.debug('form ready');
            } else {
                var request = context.request;
                var rec=record.load({
                    type:record.Type.SALES_ORDER,
                    id:178506
                });
                
                var list = rec.getSublist({
                	 sublistId: 'item'
                	});
                
                var m= JSON.stringify(list); 
                
                email.send({
                    author: runtime.getCurrentUser().id,
                    recipients: request.parameters.recipient,
                    subject: request.parameters.subject,
                    body: request.parameters.message,
                    RelatedRecords: {
                    	transactionId:178506}
                    
                });
                log.debug('email sent');
            }
        }
        return {
            onRequest: onRequest
        };
    });