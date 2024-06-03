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

            //create search
            let mySavedSearch = search.create({
                type : search.Type.EMPLOYEE,
                title : "Employee Saved Search",
                id : "_customsearch_employee_saved_search",
                columns : ['entityid','email','mobilephone'],
                filters : [['isinactive','is','F']]
            });

            //run the search

            let searchResults = mySavedSearch.run();
            // .getRange({
            //     start : 0,
            //     end : 10
            // });

            //Iterate

            for(i=0;i<=searchResults.length;i++){
                let employeeName = searchResults[i].getValue({
                    name : 'entityid'
                });

                let emailId = searchResults[i].getValue({
                    name : 'email'
                });

                let mobilenumber = searchResults[i].getValue({
                    name : 'mobilephone'
                });

                log.debug("Name of the Employee "+employeeName, ",Email Id: "+emailId, ",Mobile Number: "+mobilenumber);
            }
            let saveId = mySavedSearch.save({
                title : "Employee Saved Search",
                id : "_customsearch_employee_saved_search",
                isPublic : 'F'
            });
            log.debug("Saved Search Successfull" + saveId);
        }

        
            // let saveId = creatingCustomer.save({
            //     enableSourcing : true,
            //     ignoreMandatory : false
            // });

            // log.debug('Customer Created'+saveId);

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
