Virtualized Dropdown Component
A highly customizable dropdown component for React applications, supporting features like search, multiple selection, and virtualization for efficient rendering of large datasets.

Features
Virtualized Rendering: Efficiently renders a large list of items using react-window to improve performance.
Searchable: Supports a search field to filter through the list of items.
Multiple Selection: Allows the selection of multiple items.
Dynamic Key Field: Customizable key field (keyField) for each item.
Customizable Styling: Customizes input box width, dropdown height, item height, and more.
Responsive: Dynamically adjusts the dropdown height based on viewport size.
Installation
To use this component, you must have the following dependencies installed:

react
react-window (for virtualized rendering)
npm install react-window

Usage:
You can import the VirtualizedDropdown component and use it like this:

import VirtualizedDropdown from './path/to/VirtualizedDropdown';

const fullData = [
  { id: 1, customer: 'John Doe', email: 'john@example.com' },
  { id: 2, customer: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, customer: 'Alex Johnson', email: 'alex@example.com' },
  // Add more data as needed
];

const handleChange = (selectedItems) => {
  console.log('Selected Items:', selectedItems);
};

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Select Customer</h1>
      <VirtualizedDropdown
        fullData={fullData}
        displayKey="customer" // The field to be displayed in the dropdown
        keyField="id" // The field to be used as the unique identifier
        chunkSize={50}  // Number of items to load at once
        itemHeight={35} // Height of each item in the dropdown
        dropdownWidth="350px"
        maxDropdownHeight={300}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;



Props
Prop	Type	Default	Description
fullData	array	-	The complete dataset to be displayed in the dropdown.
chunkSize	number	100	Number of items to load at a time in the virtualized list.
itemHeight	number	35	The height of each item in the dropdown list.
displayKey	string	"customer"	The field from each item in the data object that will be displayed as the title in the dropdown (e.g., "customer", "name", "email").
inputWidth	string	"100%"	Width of the search input field.
inputHeight	string	"35px"	Height of the search input field.
inputColor	string	"#ccc"	Border color of the input field.
multipleSelect	boolean	true	Whether multiple items can be selected.
dropdownWidth	string	"350px"	Width of the dropdown menu.
maxDropdownHeight	number	300	Maximum height of the dropdown menu before it becomes scrollable.
onChange	function	-	Callback function that receives the selected items array when selection changes.
keyField	string	"id"	The field used as the unique identifier for each item in the data (e.g., "id", "key", etc.). This is used to track selected items.


Key Props Details
displayKey
This is the field from the object that will be shown as the title in the dropdown list.
You can pass any field name from your data objects. For instance, if your data objects have a customerName field, you would use displayKey="customerName".
This prop allows flexibility in choosing what field to display in the dropdown.
keyField
The keyField prop determines which field will be used to uniquely identify each item in the dataset.
For example, if your data items have an id field (like { id: 1, customer: 'John' }), you would set keyField="id".
This ensures that selections are correctly tracked using a unique identifier.
Example with Multiple Selection
If you enable multiple selection, selected items will be shown above the input field with the option to clear all selections.

<VirtualizedDropdown
  fullData={fullData}
  displayKey="customer" // You can customize this to any field you like
  keyField="id" // The unique identifier for each item
  multipleSelect={true}
  onChange={(selectedItems) => console.log(selectedItems)}
/>


Example with Single Selection
To allow for only single item selection, set multipleSelect={false}.


<VirtualizedDropdown
  fullData={fullData}
  displayKey="customer" // Display any field you want
  keyField="id" // Define which field to use as unique identifier
  multipleSelect={false}
  onChange={(selectedItems) => console.log(selectedItems)}
/>



Styling
The dropdown component is highly customizable via props, such as inputWidth, dropdownWidth, and itemHeight. If you want to further customize the styles, you can do so using inline styles or pass custom CSS classes.

Performance Considerations
For large datasets, the chunkSize prop allows you to control how many items are loaded at once to minimize render time. The component uses virtualization to only render items that are currently visible in the dropdown, improving performance when dealing with large amounts of data.
