/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/record','N/redirect','N/search'],

function(record, redirect, search) {
   
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     * @Since 2015.2  https://stackoverflow.com/questions/54171522/why-cant-i-create-a-vendor-bill-in-suitescript
     */
    function onRequest(context) {
    	var request = context.request;
        var response = context.response;

        var vendorBill = record.create({
            type: record.Type.VENDOR_BILL,
            isDynamic: true
        });

        vendorBill.setText('currency', 'USD');
        vendorBill.setValue({fieldId: 'entity', value: 10117});
        vendorBill.setValue({fieldId: 'subsidiary', value:1});
        

        var receivingLocation = '';
        
        try {
            var lineNum = vendorBill.selectNewLine({
                sublistId: 'item'
            });

            vendorBill.setCurrentSublistValue({
                sublistId: "item",
                fieldId: "item",
                value: 4431
            });

            vendorBill.setCurrentSublistValue({
                sublistId: "item",
                fieldId: "quantity",
                value: 2
            });


            vendorBill.setCurrentSublistValue({
                sublistId: "item",
                fieldId: "vendorname",
                value: 'Test Vendor'
            });

            vendorBill.commitLine({sublistId:"item"});

            log.debug('Committing vendor bill expense line addition','Name: ' + item + ", Quantity: " + quantity);
        }
        catch(e){
            log.debug('Issue committing vendor bill item line addition', e.message);
        }
       
        var vbPostPeriodValStr = String(getPostingPeriod());
        try {
            vendorBill.setText('postingperiod', vbPostPeriodValStr);
        }
        catch(e) {
            log.error('Issue setting posting period for vendor bill', e.message);
        }
        
        var receivingLocation = '';
        vendorBill.setValue('location',3);


        try {
            var vendorBillId = vendorBill.save(); 
            log.debug('Vendor Bill Saved*', 'Vendor bill successfully saved: ' + vendorBillId);
            redirect.toRecord({
                type: record.Type.VENDOR_BILL, 
                id: vendorBillId 
            });
        }
        catch(e) {
            log.debug('Error saving vendor bill', e.message);
            context.response.write('Error: ' + e.message);
        }
    }

   
    function getPostingPeriod() {
        var monthAbbr = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        var d = new Date();
        return monthAbbr[d.getMonth()] + ' ' + d.getFullYear();
    }
    
    return {
        onRequest: onRequest
    };
    
});
