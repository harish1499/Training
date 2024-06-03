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

        //Creating filters
        let filter = [['subsidiary','is','11'],'AND',['datecreated','within','previousonemonth']]; 

        //Creating columns
        let columns = ['companyname','subsidiary','salesrep','email','datecreated'];

        //Creating search
        let savedSearch = search.create({
            type : search.Type.CUSTOMER,
            title : "Customer ranges previous month JJ",
            id : "customsearch_ranges_last_month",
            filters : filter,
            columns : columns
        });

        let searchRange = savedSearch.run().getRange({
            start : 0,
            end : 4
        });

        //iterateing
        searchRange.forEach(function(result){
            let companyName = result.getValue ({ name : 'companyname'}); 
            let subsidiaryName = result.getValue ({ name : 'subsidiary'}); 
            let date = result.getValue ({ name : 'datecreated'});
        });

        //Saving the search
        let savingSearch = savedSearch.save();

        //Logging 
        log.debug("Saved Search Created : " + savingSearch);
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
