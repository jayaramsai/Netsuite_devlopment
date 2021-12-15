/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/record','N/redirect','N/search'],

function(record, redirect, search) {
   
    /**
     * Marks the beginning of the Map/Reduce process and generates input data.
     *
     * @typedef {Object} ObjectRef
     * @property {number} id - Internal ID of the record instance
     * @property {string} type - Record type id
     *
     * @return {Array|Object|Search|RecordRef} inputSummary
     * @since 2015.1
     */
    function getInputData() {
    	log.debug('fffed');
    	return search.create({
    		   type: "purchaseorder",
    		   filters:
    		   [
    		      ["type","anyof","PurchOrd"], 
    		      "AND", 
    		      ["mainline","is","T"], 
    		      "AND", 
    		      ["vendor.entityid","haskeywords","abc"]
    		   ],
    		   columns:
    		   [
    		      search.createColumn({
    		         name: "ordertype",
    		         sort: search.Sort.ASC,
    		         label: "Order Type"
    		      }),
    		      search.createColumn({name: "trandate", label: "Date"}),
    		      search.createColumn({name: "location", label: "location"}),
    		      search.createColumn({name: "currency", label: "currency"}),
    		      search.createColumn({name: "entity", label: "Name"}),
    		      search.createColumn({name: "amount", label: "Amount"}),
    		      search.createColumn({name: "subsidiary", label: "subsidiary"}),
    		      search.createColumn({name: "internalId", label: "internalId"}),
    		      
    		   ]
    		});
    		
    }

    /**
     * Executes when the map entry point is triggered and applies to each key/value pair.
     *
     * @param {MapSummary} context - Data collection containing the key/value pairs to process through the map stage
     * @since 2015.1
     */
    function map(context) {
    	
    	log.debug('context', context.value);
    	var rowJson = JSON.parse(context.value);
    	pid=rowJson.values['internalId'].value;
    	
    	var vendorBill = record.create({
            type: record.Type.VENDOR_BILL,
            isDynamic: true
        });

        vendorBill.setValue({fieldId: 'currency', value: rowJson.values['currency'].value });
        vendorBill.setValue({fieldId: 'entity', value: rowJson.values['entity'].value});
        vendorBill.setValue({fieldId: 'subsidiary', value:rowJson.values['subsidiary'].value});
        vendorBill.setValue({fieldId: 'location', value:rowJson.values['location'].value});
        
    	
    	log.debug('***id***',pid);
    	
    	var purchaseorderSearchObj = search.create({
    		   type: "purchaseorder",
    		   filters:
    		   [
    		      ["type","anyof","PurchOrd"], 
    		      "AND", 
    		      ["vendor.entityid","haskeywords","abc"],
    		      "AND", 
    		      ["internalId","is",pid], 
    		      
    		   ],
    		   columns:
    		   [
    		      search.createColumn({name: "item", label: "Item"}),
    		      search.createColumn({name: "quantity", label: "Quantity"})
    		   ]
    		});
    		var searchResultCount = purchaseorderSearchObj.runPaged().count;
    		log.debug("purchaseorderSearchObj result count",searchResultCount);
    		var searchres=purchaseorderSearchObj.run();
    		var result = searchres.getRange({
    		    start: 0,
    		    end: 50
    		    });
    		   // .run().each has a limit of 4,000 results
    		for (var i = 0; i < result.length; i++) {
    			var item = result[i].getValue({
    				 name: 'Item'
    				 });
    				 var quantity = result[i].getValue({
    				 name: 'Quantity'
    				 });
    				 log.debug(item,quantity);
    				 try {
    			            var lineNum = vendorBill.selectNewLine({
    			                sublistId: 'item'
    			            });

    			            vendorBill.setCurrentSublistValue({
    			                sublistId: "item",
    			                fieldId: "item",
    			                value: item
    			            });

    			            vendorBill.setCurrentSublistValue({
    			                sublistId: "item",
    			                fieldId: "quantity",
    			                value: quantity
    			            });


    			            vendorBill.setCurrentSublistValue({
    			                sublistId: "item",
    			                fieldId: "vendorname",
    			                value: rowJson.values['entity'].value
    			            });

    			            vendorBill.commitLine({sublistId:"item"});

    			            log.debug('Committing vendor bill expense line addition','Name: ' + item + ", Quantity: " + quantity);
    			        }
    			        catch(e){
    			            log.debug('Issue committing vendor bill item line addition', e.message);
    			        }
    		}

    		   
    		
    		
    		var vbPostPeriodValStr = String(getPostingPeriod());
            try {
                vendorBill.setText('postingperiod', vbPostPeriodValStr);
            }
            catch(e) {
                log.error('Issue setting posting period for vendor bill', e.message);
            }
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
    
   
    /**
     * Executes when the reduce entry point is triggered and applies to each group.
     *
     * @param {ReduceSummary} context - Data collection containing the groups to process through the reduce stage
     * @since 2015.1
     */
    function reduce(context) {

    }


    /**
     * Executes when the summarize entry point is triggered and applies to the result set.
     *
     * @param {Summary} summary - Holds statistics regarding the execution of a map/reduce script
     * @since 2015.1
     */
    function summarize(summary) {

    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    };
    
});
