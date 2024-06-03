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

        //creating function
        function salesOrderDetails(salesOrderId){

        //loading record
        let recordLoad = record.load({
            type : record.Type.SALES_ORDER,
            id : salesOrderId
        });

        //retriving data
        let documentNumber = recordLoad.getValue('tranid');
        let customerId= recordLoad.getValue('entity');

        //Loading customer record
        // let customerName = record.load({
        //     type : record.Type.CUSTOMER,
        //     id : customerId
        // }).getValue({
        //     fieldId : 'companyname'
        // });

        

        log.debug("Document Number : " + documentNumber);
        log.debug("Customer name : " + customerId);


        //return 
        return{
            documentNumber : documentNumber,
            customerId : customerId
        }
        
        
        }

        //calling by function name
        let salesOrderId = 33;
        let salesOrderDetail = salesOrderDetails(salesOrderId);

        //logging 
        //log.debug("Sales Order details : " + salesOrderDetail);


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
