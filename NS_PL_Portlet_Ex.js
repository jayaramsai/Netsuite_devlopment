/**
 *@NApiVersion 2.x
 *@NScriptType Portlet
 */
define(['N/search','N/ui/serverWidget'],
    function(search,serverWidget) {
        function render(params) {
            var portlet = params.portlet;
            portlet.title = 'Search Engines';
            portlet.addLine({
                text: 'New Employee',
                url: 'https://tstdrv2067293.app.netsuite.com/app/common/entity/employee.nl?whence='
            });
            portlet.addLine({
                text: 'New Purchase Order',
                url: 'https://tstdrv2067293.app.netsuite.com/app/accounting/transactions/purchord.nl?whence='
            });
            
        }
        return {
            render: render
        };
    });