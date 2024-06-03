/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search', 'N/log'],
    /**
 * @param{record} record
 * @param{search} search
 * @param{log} log
 */
    (record, search, log) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

            
            //Creating saved search
            let mySavedSearch = search.create({
                type : search.Type.CUSTOMER,
                title : "Employee Saved Search",
                id : "_customsearch_employee_saved_search",
                columns : ['entityid','subsidiary','currency'],
                //filters : [['currency','isnotempty'],'AND',['subsidiary','contains','1']]
            });

            //run and getting range
            var savedSearchRanges = mySavedSearch.run();
            
            //iterate the result
            for(i=0;i<=savedSearchRanges.length;i++){
                let subsidiaryName = savedSearchRanges[i].getValue({
                    name : 'subsidiary'
                });
                let empoyeeName = savedSearchRanges[i].getValue({
                    name : 'location'
                });
                let currencyName = savedSearchRanges[i].getRange({
                    name : 'currency'
                });

            //logging the saved search
            log.debug("Subsidiary Id is "+subsidiaryName + ",Name of Employee is  "+empoyeeName + ",Currency is "+currencyName);
            }
    
        }


        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
