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
            let filters = ['subsidiary','is','19'];

        //Creating columns
            let columns = [
                search.createColumn({name : 'companyname', label : 'Customer name'}),
                search.createColumn({name : 'subsidiary', label : 'Sub of Customer'})
            ];
        
        //create search
        let searches = search.create({
            type : search.Type.CUSTOMER,
            title : "CreateColumns Saved Search",
            id : "customsearch_create_column",
            filters : filters,
            columns : columns
        });

    //logging
        log.debug("Till search.create successfull");

    //Processing the search 
        let savingSearch = searches.run().getRange({
            start : 0,
            end : 10
        });

    //logging
    log.debug("Till run().getRange() successfull");


    //iterate the result

            savingSearch.forEach(function(result){
            let customerName = result.getValue({name : 'companyname'});
            let subsidiaryId = result.getValue({name : 'subsidiary'})

    //Logging 

            log.debug ("CUstomer Name is "+customerName +",Subsidiary id is : "+subsidiaryId)
        });

    //Saving

            let searchSave = searches.save();
            log.debug("Saved successfully" + searchSave);
    
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
