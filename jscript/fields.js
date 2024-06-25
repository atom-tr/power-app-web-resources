/**
 * Checks for duplicate values in a table
 * @param {ExecutionContext} executionContext - The execution context
 * @param {string} fieldName - The logical name of the field to validate
 * @param {string} tableName - The logical name of the table to check for duplicates
 */
function no_duplicate(executionContext, fieldName, tableName) {
    const formContext = executionContext.getFormContext();
    const field = formContext.getAttribute(fieldName);
    const recordId = formContext.data.entity.getId(); // Get the current record's ID
    if (field) {
        const fieldValue = field.getValue();
        if (fieldValue) {
            // Perform an OData query to check for duplicates
            const req = new XMLHttpRequest();
            req.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.2/" + tableName + "?$filter=" + fieldName + " eq '" + fieldValue + "' and " + "not(" + tableName + "id eq " + recordId + ")", true);
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        const results = JSON.parse(this.response);
                        if (results.value.length > 0) {
                            field.controls.get(0).setNotification("This value already exists.", "unique_error");
                        } else {
                            field.controls.get(0).clearNotification("unique_error");
                        }
                    } else {
                        console.error(this.statusText);
                    }
                }
            };
            req.send();
        }
    }
}

/**
 * Checks for inpyut values in match a regex pattern
 * @param {ExecutionContext} executionContext - The execution context
 * @param {string} fieldName - The logical name of the field to validate
 * @param {string} err_message - Error message show below input field
 */
function pattern_validation(executionContext, pattern, fieldName, err_message = `Input must be match the pattern ${pattern}`) {
    const formContext = executionContext.getFormContext();
	const field = formContext.getAttribute(fieldName)
	const value = field.getValue();
	if (RegExp(pattern).test(value)) {
		field.controls.get(0).clearNotification("pattern_validation");
	} else {
		field.controls.get(0).setNotification(err_message, "pattern_validation");
	}
	return;
}