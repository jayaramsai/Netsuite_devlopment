/**
 *@NApiVersion 2.x
 *@NScriptType Portlet
 */
define(['N/search'],
    function(search) {
        function render(params) {
            var portlet = params.portlet;
            portlet.title = 'Employee Search';
            var fld = portlet.addField({
                id: 'text',
                type: 'text',
                label: 'Enter Name'
            });
            fld.updateLayoutType({
                layoutType: 'normal'
            });
            fld.updateBreakType({
                breakType: 'startcol'
            });
            portlet.setSubmitButton({
                url: 'http://httpbin.org/post',
                label: 'Submit',
                target: '_top'
            });
        }
        return {
            render: render
        };
    });