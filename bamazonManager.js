var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "circletriangle123",
  database: "bamazon123"
}); // END CREATECONNECTION FUNCTION


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);  
  start();
});

function start()
{
	console.log("-----------------");
    	inquirer.prompt([
      {
        name: "command4",
        message: "Select an option from this menu:",
        type: "list",
        choices: ["View Products for Sale","View Low Inventory", "Add to Inventory","Add New Product"]
     
      }
      ]).then(function(response){

              switch (response.command4){

                case ("View Products for Sale"):
                console.log("View Products for Sale");
                product_sales();
                  break;

                case ("View Low Inventory"):
                console.log("View Low Inventory");
                low_inventory();
                  break;

                  case ("Add to Inventory"):
                console.log("Add to Inventory");
                add_inventory();
                  break;

                   case ("Add New Product"):
                console.log("Add New Product");
                add_product();
                  break;

              }})}


    function product_sales() {
    	 connection.query("SELECT * FROM products", function(err, results) 
    {
    	if (err) throw err;
    		console.log("-----------------");
    	for (var i = 0; i < results.length; i++) 
          {
           console.log(results[i].item_id + ": " + results[i].product_name + 
           	", Price: $" + results[i].price + ", Remaining Quantity: " + results[i].stock_quantity);
    }
    		console.log("-----------------");

    		the_end();
})}

    	 function low_inventory() {
    	 connection.query("SELECT * FROM products WHERE stock_quantity<5", function(err, results) 
    {
    	if (err) throw err;
    		console.log("-----------------");
    	for (var i = 0; i < results.length; i++) 
          {
           console.log(results[i].item_id + ": " + results[i].product_name + 
           	", Price: $" + results[i].price + ", Remaining Quantity: " + results[i].stock_quantity);
    }
    		console.log("-----------------");

    		the_end();
})}


    	 function add_inventory() {

    	 connection.query("SELECT * FROM products", function(err, results) 
    {
    	if (err) throw err;
    		console.log("-----------------");

      inquirer.prompt([
      {
        name: "command5",
        message: "Choose an item to add to",
        type: "list",
        choices: function()
        {
          var choiceArray = [];
           for (var i = 0; i < results.length; i++) 
          {
            var choose = results[i].item_id + "---" + results[i].stock_quantity + "---" + results[i].product_name;
            choiceArray.push(choose);
          };
          return choiceArray;
        }
      },
      {
        name: "command6",
        message: "How many items would you like to add?",
        type:"input",   
      }
    ]).then(function (answer) 
      {
        var chosen_item = answer.command5.split("---")[0];
        var store_stock = parseInt(answer.command5.split("---")[1]);
        var chosen_item_name = answer.command5.split("---")[2];
        var item_add = parseInt(answer.command6);
  		
        if (isNaN(item_add)){
        	console.log("-----------------");
          console.log("Invalid Number");
          console.log("-----------------");
         the_end();
        }
        	else { 

  		var new_stock = store_stock + item_add;

  		 connection.query("UPDATE products SET ? WHERE ?",
                      [
                      {
                       stock_quantity: new_stock
                       },
                       {
                        item_id: chosen_item
                        }
                          ]
                        );

  		 	console.log(chosen_item_name + " now has " + new_stock + " items in stock.");
    		console.log("-----------------");

    		the_end();}
})})}


function add_product(){

	console.log("-----------------");
		inquirer.prompt([
      {
        name: "command7",
        message: "Enter in the name of the product:",
        type: "input",
  		},
  		{
  		name: "command8",
  		message: "Enter in the department name:",
  		type: "input",
		},
		{
		name: "command9",
		message: "Enter in the price:",
		type: "input",
		},
		{
		name: "command10",
		message: "Enter in the stock quantity:",
		type: "input",
		}

    ]).then(function (answer) 

    {
    	var new_product = answer.command7;
    	var new_department =  answer.command8;
    	var new_price = parseFloat(Math.round(answer.command9.replace("$","")*100)/100).toFixed(2);
    	var new_quantity = parseInt(answer.command10);

    	console.log("-----------------");

    	if ((new_product== "")||(new_department=="")||(new_price=="")||(new_quantity===""))
    		{console.log("Some fields not filled");
    		    	console.log("-----------------");
    		the_end();}
    	else if (isNaN(new_price)||isNaN(new_quantity)||(typeof new_product !== 'string')||(typeof new_department !== 'string'))
    	{
    		console.log("Invalid field entries");
    		console.log("-----------------");
    		the_end();
    	}
    	else{

    	connection.query("INSERT INTO products SET ?",
    	{
    		product_name: new_product,
    		department_name: new_department,
    		price: new_price,
    		stock_quantity: new_quantity
    	},
    	function(err,res) {
    		console.log("-----------------");

    		if (err) throw err;
    	console.log("NEW PRODUCT: " + new_quantity + " of " + new_product + " in " + new_department + " department, selling at $" + new_price);
		console.log("-----------------");
    	the_end();
    	})
    	}
})

    }









function the_end(){


    	inquirer.prompt([
      {
        name: "command11",
        message: "Return to Main Menu or Exit",
        type: "list",
        choices: ["Return", "Exit"]
     
      }
      ]).then(function(response){

              switch (response.command11){

                case ("Return"):
               	start();
                  break;

                case ("Exit"):
               process.exit(0);
                  break;
}})}

