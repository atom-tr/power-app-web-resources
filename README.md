# Model-driven Apps Web resources collection

- Step 1: Create the JavaScript Web Resource
 	- Navigate to Your Solution:
  		- Go to `Power Apps`.
  		- Select your environment and navigate to `Solutions`.
  		- Choose an existing solution or create a new one.
 	- Add a New Web Resource:
  		- Click `New` > `Web Resource`.
  		- Set the `Name`, `Display Name`, and `Type` (JavaScript).
  		- Either upload your JavaScript file or create a new one in the editor.

- Step 2: Add the JavaScript to the Form
 	- Open the Form Editor:
  		- In your solution, find the table (e.g., "Contact") and open the `Forms` tab.
  		- Select the main form you want to edit.
 	- Add Form Libraries:
  		- In the form editor, click on `Form Properties`.
  		- Under `Form Libraries`, add the JavaScript web resource you created.
 	- Add an Event Handler:
  		- Click on the field you want to copy from.
  		- In the field properties, go to the `Events` tab.
  		- Click `Add` under the `OnChange` event.
  		- In the `Handler Properties` dialog:
   			- Set `Library` to the web resource you added.
   			- Set `Function` to `abc`.
   			- Ensure Pass execution context as first parameter is checked.
   			- In the Parameters field, enter the name of the field as a string, e.g., "yourFieldName".
