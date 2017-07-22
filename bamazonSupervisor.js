var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "circletriangle123",
  database: "bamazon123"
});


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
        name: "command12",
        message: "Select an option from this menu:",
        type: "list",
        choices: ["View Products by Department","Create a New Department"]
     
      }
      ]).then(function(response){

              switch (response.command12){

                case ("View Products by Department"):
               
                product_departments();
                  break;

                case ("Create a New Department"):
               
                new_departments();
                  break;

 }});}

      function product_departments(){
      console.log("-----------------");

          var q = "select a.department_id, a.department_name, a.over_head_costs,"+ "temp.product_sales, (temp.product_sales -  a.over_head_costs) as" + " total_profit  from departments a JOIN" +
    "(select department_name,  sum(product_sales) as product_sales  from " + "products " +
    "GROUP BY department_name)as temp " +
    "ON a.department_name = temp.department_name ORDER BY department_id";

          connection.query(q, function(error,result){

                if (error) throw error;
          var t = new Table;

            for (var m=0;m<result.length;m++)
            {
              var dep_id = result[m].department_id;
              var dep_name = result[m].department_name;
              var dep_costs = result[m].over_head_costs;
              var dep_sales = result[m].product_sales;
              var dep_profit = result[m].total_profit;
          
          t.cell('ID', dep_id);
          t.cell('Department Name', dep_name);
          t.cell('Over Head Costs', dep_costs);
          t.cell('Product Sales', dep_sales);
          t.cell('Total Profit', dep_profit);
          t.newRow();
        };

        console.log(t.toString()); 
        the_end();
          });

        }

	

      function new_departments(){
      	console.log("New Departments");	


       connection.query("SELECT * FROM departments", function(error, results) 
    {
      if (error) throw error;
        console.log("-----------------");

      inquirer.prompt([
      {
        name: "command13",
        message: "What department would you like to add?",
        type:"input",   
      },
      {
        name: "command14",
        message: "What are the overhead costs?",
        type:"input",   
      }
    ]).then(function (answer) 
      {

      var new_departing =  answer.command13;
      var new_costing = parseFloat(Math.round(answer.command14.replace("$","")*100)/100).toFixed(2);
      
        if (isNaN(new_costing)){
          console.log("-----------------");
          console.log("Invalid Number");
          console.log("-----------------");
         the_end();
        }
          else { 

       connection.query("INSERT INTO departments SET ?",
       {
        department_name: new_departing,
        over_head_costs: new_costing

      },

      function(err,res) {
        console.log("-----------------");

        if (err) throw err;
        console.log("NEW DEPARTMENT: " + new_departing + ", INITIAL COSTS: $" + new_costing);
          console.log("-----------------");
       the_end();
     });
   }
 });})}


function the_end(){

    	inquirer.prompt([
      {
        name: "command15",
        message: "Return to Main Menu or Exit",
        type: "list",
        choices: ["Return", "Exit"]
     
      }
      ]).then(function(response){

              switch (response.command15){

                case ("Return"):
               	start();
                  break;

                case ("Exit"):
               process.exit(0);
                  break;

        }})};