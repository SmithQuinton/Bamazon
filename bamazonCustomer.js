var mysql = require("mysql");
var inquirer = require("inquirer");

// --------------------------- Connect ------------------------------------
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});

// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId);
//     con.query("SELECT * FROM products", function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
// });

connection.connect(function(err) {
    if (err) throw err;
    connection.query("SELECT * FROM products", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      start();
    });
  });
// ---------------------------------------------------------------------
function start() {
    inquirer.prompt([{
        type: "input",
        name: "inputID",
        message: "Enter the item_id number of the item you would like to purchase.",
    },
    {
      type: "input",
      name: "inputNumber",
      message: "How many units of this item would you like to purchase?",  
    }
    ]).then(function(buyItem) {
        connection.query("SELECT * FROM products WHERE item_id=?", buyItem.inputID, function(err, res) {
            for (var i = 0; i < res.length; i++) {
                if (buyItem.inputNumber > res[i].stock_quantity) {
                    console.log("Bamazon does not have that much of that item.")
                } else {
                    console.log("We got that in stock.");
                    console.log("Your order is:")
                    console.log("-----------------")
                    console.log("Item: " + res[i].product_name);
                    console.log("Department: " + res[i].depatment_name);
                    console.log("Price: " + res[i].price);
                    console.log("Quantity: " + res[i].stock_quantity);
                    console.log("---------------")
                    console.log("Total: " + res[i].price * buyItem.inputNumber);

                    var newStock = (res[i].stock_quantity - buyItem.inputNumber);
                    var purchaseID = (buyItem.inputID);
                    confirmOrder(newStock, purchaseID);
                }
            }
        })
    })
}

function confirmOrder(newStock, purchaseID) {
    inquirer.prompt([{
        type: "confirm",
        name: "confirmOrder",
        message: "Is everything correct?",
        default: "true",
    }]).then(function(userConfirm) {
        if (userConfirm.confirmOrder === true) {
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newStock
            },{
              item_id: purchaseID  
            }], function(err, res) {
                if (err) throw err;
            });
            console.log("Purchase Complete");
            console.log("====================");
            connection.query("SELECT * FROM products", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                start();
              });
            // start();
        }else {
            console.log("Purchase Canceled");
            console.log("==================")
            connection.query("SELECT * FROM products", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                start();
              });
            // start();
        };
    });
}

// inquirer.prompt([{

//     type: "input",
//     name: "inputId",
//     message: "Please enter the ID number of the item you would like to purchase.",
// },
// {
//     type: "input",
//     name: "inputNumber",
//     message: "How many units of this item would you like to purchase?",

// }
// ]).then(function(buyItem) {
//     connection.query("SELECT * FROM products WHERE item_id=?", userPurchase.inputId, function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//             if (buyItem )
//         }
//     })   
// });


// function start() {
//     inquirer.prompt ([{
//         type: "confitm",
//         name: "confirm",
//         message: "Do you want to view the inventory?",
//         default: "true"
//     }])
//         .then(function(user) {
//             if (user.confirm === true) {
//                 inventory();
//             } else {
//                 console.log("I guess you don't want any cool stuff. Deuces.")
//             }
//         });
// }


