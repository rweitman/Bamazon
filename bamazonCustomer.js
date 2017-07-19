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
    connection.query("SELECT * FROM products", function(err, results) 
    {
      if (err) throw err;

      inquirer.prompt([
      {
        name: "command",
        message: "What product would you like to buy?",
        type: "list",
        choices: function()
        {
          var choiceArray = [];
           for (var i = 0; i < results.length; i++) 
          {
            var choose = results[i].item_id + ". " + results[i].product_name + ". $" + results[i].price;
            choiceArray.push(choose);
          };
          return choiceArray;
        }
      },
      {
        name: "command2",
        message: "How many units would you like to buy?",
        type:"input",   
      }
    ]).then(function (answer) 
      {
        var chosen_product = answer.command.split(". ")[0];
        var chosen_pricing = answer.command.split(". ")[2];
        var chosen_price = parseInt(chosen_pricing.split("$")[1]);
        var chosen_purchase = parseInt(answer.command2);

        if (isNaN(chosen_purchase)){
          console.log("Invalid Number");
          console.log("Transaction cancelled...");
          process.exit(1);
        }
  
      connection.query("SELECT * FROM products WHERE item_id=?",[chosen_product], function(err, resulting) 
      {
      if (err) throw err;
      var store_stock = resulting[0].stock_quantity;
      console.log("Store Stock: " + store_stock);
      if (chosen_purchase>store_stock)
      {
        console.log("Insufficient Quantity!");
        console.log("Transaction cancelled...");
        process.exit(1);
      }
      else 
      {
        var potential_price = chosen_price * chosen_purchase;
        var price_message = "This would cost $" + potential_price + ". Are you sure you want to buy this product?";
        inquirer.prompt([
        {
          name: "command3",
          message: price_message,
          type: "confirm"
        }

          ]).then(function(response){

              switch (response.command3){

                case (false):
                console.log("Transaction cancelled...");
                process.exit(1);
                  break;


                case (true):
                console.log("Transaction confirmed...");
                item_processing();
                break;

              }
                 function item_processing() {
                    var new_quantity = store_stock - chosen_purchase;
                    console.log("Processing Purchase...");
                    console.log("Remaining Stock Quantity: " + new_quantity);
            
                    connection.query("UPDATE products SET ? WHERE ?",
                      [
                      {
                       stock_quantity: new_quantity
                       },
                       {
                        item_id: chosen_product
                        }
                          ]
                        )};

                    console.log("Your total cost was $" + potential_price + ".");
                    console.log("Thank you for shopping with us today!");
                      process.exit(0);














            })
        }
      })
})})}

