# DeliveryPage Clone

## Setup

To run this project, start a json-server in one terminal: ```json-server --watch ./data/data.json --port 8000```
and start the development server in a different terminal: ```npm start```

## Todos

### Fetching Data
- [x] Get the data from local storage file
- [x] Store the data inside Redux-Store
- [x] Implement persistent state (for menu list and shopping cart)
  
### Displaying Data
- [x] Display the data in a table
  - [x] Only the first 10 rows should be displayed (disabled because of type filter)
  - [x] Add a pagination to display the rest of the data (disabled because of type filter)
  - [x] Show number of currently displayed items

### Filtering Data
- [x] Filter the data
  - [x] Filter by favorite items   
  - [x] Filter by search
    - [x] Add a button to remove the filter
  - [x] Filter by type
    - [x] Highlight the type of the items currently in the center of the list view
  
### Shopping Cart
- [x] Display the shopping cart in a table on the righ-hand side of the screen
- [x] Add a button to add an item to the shopping cart
- [x] Add a button to remove an item from the shopping cart
- [x] Add buttons to increase and decrease the quantity of items in the shopping cart
- [x] Add a checkout button
