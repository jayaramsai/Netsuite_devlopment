/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(['N/search', 'N/runtime', 'N/task', 'N/error'],
		
		
function (nSearch, nRuntime, nTask, nError) {

    function execute(context) {
        try {
        	log.debug('dvcdf');
        	var mySearch = nSearch.load({
       		 id: 3617});
        	
        	
        	
       		var searchResults = mySearch.run();
       		var jsonString = JSON.stringify(searchResults); 



            var currentScript = nRuntime.getCurrentScript();

            // Initial exectution of the script, would retrieve a null or undefined value.
            var loopMarker = currentScript.getParameter({
                name: 'custscript_serchitemid'
            });

            if (!isArrayEmpty(searchResults)) {
                for (var i = 0; i < searchResults.length; i++) {
                    if (currentScript.getRemainingUsage() < 1000) {
                        log.debug('Rescheduling Script', 'rescheduling script');

                        var rescheduleTask = nTask.create({
                            taskType: nTask.TaskType.SCHEDULED_SCRIPT,
                            scriptId: currentScript.id,
                            deploymentId: currentScript.deploymentId
                        });

                        var taskId = rescheduleTask.submit();

                        if (nTask.checkStatus({ taskId: taskId }) === 'QUEUED') {
                            log.debug('Finished rescheduling', 'Finished rescheduling');
                            break;
                        }

                        //When null or undefined, loopMarker has a value of 0
                        loopMarker = (loopMarker) ? parseInt(loopMarker) : 0;

                        var stArray = getAssociatedRecords.split(',');

                        for (var j = 0; j < stArray.length; j++) {
                            if (currentScript.getRemainingUsage() < 1800) {
                                var params = [];

                                //this can be seen inside the if statement checking the usage limit of the script on the inner for loop
                                params['custscript_serchitemid'] = j;

                                var rescheduleTask = nTask.create({
                                    taskType: nTask.TaskType.SCHEDULED_SCRIPT,
                                    scriptId: currentScript.id,
                                    deploymentId: currentScript.deploymentId
                                });

                                var taskId = rescheduleTask.submit();

                                if (nTask.checkStatus({ taskId: taskId }) === 'QUEUED') {
                                    log.debug('Finished rescheduling', 'Finished rescheduling');
                                    break;
                                }

                                var stSOId = strArray[j].split('-')[0];

                                // Continue running business logic
                                var entity = searchResults[j].getValue({
                           		 name: 'internalid'
                           		 });
                            		 log.debug(entity);

                                
                            }
                        }

                        // Resets the loopMarker to indicate that the script finished executing without exeeding the limit
                        loopMarker = 0;
                    }
                }
            }
        } catch (e) {
            log.error(e.name, e.details);
        }
    }

    return {
        execute: execute
    }
});