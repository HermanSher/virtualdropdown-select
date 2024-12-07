# Virtualized Dropdown Select

A customizable, virtualized dropdown component for selecting multiple items with search and dynamic loading. It uses `react-window` for rendering large lists efficiently.

## Installation

To install `virtualdropdown-select` via npm, run:

```bash
npm install virtualdropdown-select

yarn add virtualdropdown-select


Usage
Here's an example of how to use the VirtualizedDropdown component in your React app:

import React from "react";
import VirtualizedDropdown from "virtualdropdown-select";

const MyComponent = () => {
  const fullData = [
    { id: 1, customer: "John Doe", position: "Manager" },
    { id: 2, customer: "Jane Smith", position: "Developer" },
    // Add more data as needed
  ];

  const handleChange = (selectedItems) => {
    console.log(selectedItems);
  };

  return (
    <VirtualizedDropdown
      fullData={fullData}
      displayKey="customer"
      onChange={handleChange}
      multipleSelect={true}
      chunkSize={100}
    />
  );
};

export default MyComponent;


# Virtualized Dropdown Select

## Props

| Prop Name         | Type               | Default Value | Description                                                                                  |
|-------------------|--------------------|---------------|----------------------------------------------------------------------------------------------|
| `fullData`        | `Array`            | `[]`          | The full list of data to be displayed in the dropdown.                                        |
| `chunkSize`       | `number`           | `100`         | The number of items to load at a time.                                                        |
| `itemHeight`      | `number`           | `35`          | Height of each item in the dropdown list.                                                     |
| `displayKey`      | `string`           | `customer`    | The key in the object that will be displayed as the text in the dropdown.                     |
| `inputWidth`      | `string`           | `100%`        | The width of the search input field.                                                          |
| `inputHeight`     | `string`           | `35px`        | The height of the search input field.                                                         |
| `inputColor`      | `string`           | `#ccc`        | The border color of the search input field.                                                   |
| `multipleSelect`  | `boolean`          | `true`        | Whether multiple items can be selected.                                                       |
| `dropdownWidth`   | `string`           | `350px`       | The width of the dropdown list.                                                               |
| `maxDropdownHeight` | `number`         | `300`         | The maximum height of the dropdown list before scrolling is enabled.                          |
| `onChange`        | `(selectedItems: Array)` | `undefined` | Callback function that is triggered when the selection changes. Receives the selected items.  |
| `keyField`        | `string`           | `id`          | The field that will be used as the unique identifier for the items.                           |

## Example Usage

```tsx
import React from "react";
import VirtualizedDropdown from "./VirtualizedDropdown";

const MyComponent = () => {
  const fullData = [
    { id: 1, customer: "John Doe", position: "Manager" },
    { id: 2, customer: "Jane Smith", position: "Developer" },
    // Add more data as needed
  ];

  const handleChange = (selectedItems) => {
    console.log(selectedItems);
  };

  return (
    <VirtualizedDropdown
      fullData={fullData}
      displayKey="customer"
      onChange={handleChange}
      multipleSelect={true}
      chunkSize={100}
    />
  );
};

export default MyComponent;


Features
Virtualization: Renders only the visible items for improved performance with large datasets.
Searchable Dropdown: Allows users to filter the list based on the search query.
Multiple Selection: Supports multiple selections when multipleSelect is true.
Dynamic Loading: Loads additional items as the user scrolls.


Customization
inputWidth: Customize the width of the input field.
inputHeight: Adjust the height of the input field.
dropdownWidth: Customize the width of the dropdown list.
maxDropdownHeight: Set a maximum height for the dropdown before it becomes scrollable.


License
This project is licensed under the MIT License - see the LICENSE file for details.


