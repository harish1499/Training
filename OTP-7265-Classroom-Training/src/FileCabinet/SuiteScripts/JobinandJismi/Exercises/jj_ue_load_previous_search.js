/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log', 'N/record', 'N/search'],
    /**
 * @param{log} log
 * @param{record} record
 * @param{search} search
 */
    (log, record, search) => {
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

        //Function
        function savedSearchId(searchId){

         //Loading the search
         let previousSearch = search.load({
            id : searchId
        });

        //Running and getting range
        let searchRunRange = previousSearch.run().getRange({
            start : 0,
            end : 5
        });

        //iterating the search result
        searchRunRange.forEach(function(results){
            let customerName = results.getValue({ name : 'companyname'});
            let subsidiaryName = results.getValue({ name : 'subsidiary'});
            let salesRepName = results.getValue({ name : 'salesrep'});

        //logging the result
        log.debug("The Customer name is : "+customerName);
        log.debug("From Subsidiary id : "+subsidiaryName, "The Sales rep is : "+salesRepName);
        })

        return{savedSearchId};
        }

        //Calling the function
        savedSearchId(183);

        //logging 
        log.debug("Search Loaded Successfully")

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
