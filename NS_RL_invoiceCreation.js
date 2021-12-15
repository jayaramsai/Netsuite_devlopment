/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search','N/format'],
/**
 * @param {record} record
 * @param {search} search
 */
function(record, search,format) {
   
    /**
     * Function called upon sending a GET request to the RESTlet.
     *
     * @param {Object} requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
     * @since 2015.1
     */
    function doGet(requestParams) {
    	//getting dates
    	var startdate =new Date(requestParams.sdate); // requestParams.start;requestParams.id 'January 1, 2020'
    	var enddate =new Date(requestParams.edate); // requestParams.end; 'July 1, 2020'
    	
    	//formating dates
    	var myDate = format.format({
    			value: startdate,
    			type: format.Type.DATE
    		});
    	var myDate1 = format.format({
			value: enddate,
			type: format.Type.DATE
		});	
    	
    	//creating serch
    	var mySearch = search.load({
			id: 'customsearch_invoice_search'
		});
    	
    	mySearch.filters.push(search.createFilter({
    		name: 'trandate',
    		operator: search.Operator.WITHIN,
    		values:[myDate,myDate1]
    	}));
    	
    
    	var res=[];
    	var l=0;
    	
        //running paged search	
    	var myPagedData = mySearch.runPaged();
    	
    	
    	 myPagedData.pageRanges.forEach(function(pageRange){
    	 var myPage = myPagedData.fetch({index: pageRange.index});
    	 myPage.data.forEach(function(result){
    		
    		 
    		 var internalid = result.getText({
    	    	 name: 'internalid'
    	    	 });
    		 	 
    		 var entity = result.getText({
    			 name: 'entity'
    		 	 });
    		 var trandate = result.getValue({
    	    	 name: 'trandate'
    	    	 });
    		 var amount = result.getValue({
    			 name: 'amount'
	    	 	});
    		 
    	 var a={};
    	 a["Searial Number"]=l++
    	 a["internalid"]=internalid;
    	 a["Customer Name"]=entity;
    	 a["Transaction Date"]=trandate;
    	 a["amount"]=amount;
    	 a["items_details"]=getitemdetails(internalid);

    	 res.push(a);
    	 });
    	 });
    	 return res;
    	 
    	 
function getitemdetails(internalid){
	
	var b=[];
	var c=1;
	//loading search
	var itemsearch = search.load({
        id: 'customsearch_invoice_item_details'
       });
	  //adding filter
    itemsearch.filters.push(search.createFilter({
           name: 'internalid',
           operator: search.Operator.IS,
           values:internalid
       }));
    
    //running search
    
    var myResultSet = itemsearch.run();
    var result = myResultSet.getRange({
    start: 0,
    end: 50
    });
    for (var i = 0; i < result.length; i++) {
    	var itemdetails1={};
        var item = result[i].getText({
        name: 'item'
        });
        var quantity = result[i].getValue({
        name: 'quantity'
        });
        var item_cost = result[i].getValue({
            name: 'amount'
            });
    itemdetails1["no.item"]=c++;    
    itemdetails1["itemName"]=item;
    itemdetails1["Quantity"]=quantity;
    itemdetails1["item_cost"]=item_cost;
    

    
    b.push(itemdetails1);
    	
    }
    
    
    
    
    
    /*itemsearch.run().each(function(result) {
    	var itemdetails1={};
        var item = result.getText({
        name: 'item'
        });
        var quantity = result.getValue({
        name: 'quantity'
        });
        var item_cost = result.getValue({
            name: 'amount'
            });
    itemdetails1["itemName"]=item;
    itemdetails1["Quantity"]=quantity;
    itemdetails1["item_cost"]=item_cost;
    itemdetails1["no"]=c++;

    
    b.push(itemdetails1);
     });
	*/
	
	
	
	return b
}
    	
    	
    	
    	
/*    	var results = [];
        var count = 0;
        var pageSize = 1000;
        var start = 0;
        
     // run  search
        do {
            var subresults = mySearch.run().getRange({
                start: start,
                end: start + pageSize
            });
            
            

            results = results.concat(subresults);
            count = subresults.length;
            start += pageSize;
        } while (count == pageSize);

        return results;
    */
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	/*var response={};
    	var total=[];
    	
    	
    	
    
    	var myResultSet = mySearch.run();
    	log.debug('fefccd');
    	 var resultRange = myResultSet.getRange({
    		 start: 10,
    		 end:600
    		 });
    	for (var i = 0; i < resultRange.length; i++) {
    			 var entity = resultRange[i].getText({
    	    		 name: 'entity'
    	    		 });
    			 var amount = resultRange[i].getValue({
    	    		 name: 'total'
    	    		 });
	    		var trandate = resultRange[i].getValue({
	    		 name: 'trandate'
	    		 });
    		
	    		var internalid = resultRange[i].getValue({
	       		 name: 'internalid'
	       		 });
     		response['internalid'] = internalid;
        	response['entity'] = entity;
     		response['trandate'] = trandate;
        	response['amount'] = amount;
        	total=total.concat(response);
        	      	

        	
        	
    		 }
    	
    		 return JSON.stringify(total);
*/
    	

    	

    	

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
    	
    	var invoice = record.create({type: 'invoice', isDynamic: true});
    	//getting entity value
    	var entity=requestBody.entity;
    	invoice.setValue({fieldId: 'entity', value: entity});
    	var noitems=requestBody.items.length;
    	//return requestBody.items[0];
    
    		
    		for(var i=0;i<noitems;i++)
    			{
    			invoice.selectNewLine({sublistId: 'item'});
    			var obj={};
    			obj["itemid"]=requestBody.items[i].itemid;
    			
    			invoice.setCurrentSublistValue({
        	        sublistId: 'item',
        	        fieldId: 'item',
        	        value:obj.itemid,
        	        ignoreFieldChange: true
        	    });
    			var quantity=requestBody.items[i].quantity;
        	    invoice.setCurrentSublistValue({
        	        sublistId: 'item',
        	        fieldId: 'quantity',
        	        value: quantity,
        	        ignoreFieldChange: true
        	    });
        	    
        	    var amount=requestBody.items[i].amount;
        	    invoice.setCurrentSublistValue({
        	        sublistId: 'item',
        	        fieldId: 'amount',
        	        value:amount,
        	        ignoreFieldChange: true
        	    });
        	   
        	    invoice.setCurrentSublistValue({
        	        sublistId: 'item',
        	        fieldId: 'taxcode',
        	        value:-7,
        	        ignoreFieldChange: true
        	    });
        	    
        	invoice.commitLine({sublistId: 'item'});
        	
    			
    			
    			
    		}
    	/*invoice.selectNewLine({sublistId: 'item'});
    	
    	//creating item sublist
    	
    	var itemid=requestBody.item1;

    	    invoice.setCurrentSublistValue({
    	        sublistId: 'item',
    	        fieldId: 'item',
    	        value:itemid,
    	        ignoreFieldChange: true
    	    });
    	    log.debug('record created');
    	    
    	    var quantity=requestBody.quantity1;
    	    invoice.setCurrentSublistValue({
    	        sublistId: 'item',
    	        fieldId: 'quantity',
    	        value: quantity,
    	        ignoreFieldChange: true
    	    });
    	    
    	    var amount=requestBody.amount1;
    	    invoice.setCurrentSublistValue({
    	        sublistId: 'item',
    	        fieldId: 'amount',
    	        value:amount,
    	        ignoreFieldChange: true
    	    });
    	   
    	    invoice.setCurrentSublistValue({
    	        sublistId: 'item',
    	        fieldId: 'taxcode',
    	        value:-7,
    	        ignoreFieldChange: true
    	    });
    	    
    	invoice.commitLine({sublistId: 'item'});
    	
    	invoice.selectNewLine({sublistId: 'item'});
    	
    	//creating second item sublist
    	
    	var itemid=requestBody.item2;

    	    invoice.setCurrentSublistValue({
    	        sublistId: 'item',
    	        fieldId: 'item',
    	        value:itemid,
    	        ignoreFieldChange: true
    	    });
    	    log.debug('record created');
    	    
    	    var quantity=requestBody.quantity2;
    	    invoice.setCurrentSublistValue({
    	        sublistId: 'item',
    	        fieldId: 'quantity',
    	        value: quantity,
    	        ignoreFieldChange: true
    	    });
    	    
    	    var amount=requestBody.amount2;
    	    invoice.setCurrentSublistValue({
    	        sublistId: 'item',
    	        fieldId: 'amount',
    	        value:amount,
    	        ignoreFieldChange: true
    	    });
    	   
    	    invoice.setCurrentSublistValue({
    	        sublistId: 'item',
    	        fieldId: 'taxcode',
    	        value:-7,
    	        ignoreFieldChange: true
    	    });
    	    
    	invoice.commitLine({sublistId: 'item'});*/
    	
    	var res=invoice.save({enableSourcing: true, ignoreMandatoryFields: true});
    	log.debug(res);
    	return res

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
