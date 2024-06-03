/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {
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

        //Creating filter
        let filter = [['status','anyof','CustInvc:A']];

        //Creating column
        let column = ['tranid','trandate','entity','customer.email','amountremaining'];

        //Creating search
        let savedSearch = search.create({
            type : search.Type.INVOICE,
            title : "Open Invoice Saved Search",
            id : "customsearch_open_invoice",
            filters : filter,
            columns : column
        });

        //Run and giving range
        let runSearch = savedSearch.run().getRange({
            start: 0,
            end: 10
        });

        //Iterate the values from the range
        runSearch.forEach(function(result){
            let documentNumber = result.getValue({name : "tranid"});
            let date = result.getValue({name : "trandate"});
            let customerName = result.getValue({name : "entity"});
            let customerEmail = result.getValue({name : "customer.email"});
            let amount = result.getValue({name : "amountremaining"});
        })                                                                    

        //Saving the savedSearch
         let savingSavedSearch = savedSearch.save();

         //Logging
         log.debug("Saved Search Successfull : "+savingSavedSearch);
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
