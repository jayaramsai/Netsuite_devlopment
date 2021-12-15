define(['N/search'],
/**
 * @param {search} search
 */
function(s) {
	var search = s.load({
        id: "customsearch_search_test"
    });
    var resultSet = search.run();
    resultSet.each(printEmployeeName);
    
    function printEmployeeName(result) {
        log.debug({
            title: "Employee Name:",
            details: result.getValue({name: "firstname"})
        });
        return true;
    }

 });
