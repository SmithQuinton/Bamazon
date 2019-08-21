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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connection as id " + connection.threadID);
    start();
});

function start() {
    inquirer.prompt([{
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function (userChoice) {
        if (userChoice.menu === "View Products for Sale") {
            viewInventory();
        } else if (userChoice.menu === "View Low Inventory") {
            viewLowInventory();
        } else if (userChoice.menu === "Add to Inventory") {
            addInventory();
        } else if (userChoice.menu === "Add New Product") {
            addProduct();
        }
    })
};
// ------------------ View Inventory --------------------
function viewInventory() {
    connection.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        console.log("---------------------------------------")
        start();
    })
}

// ------------------- View Low Inventory ------------------
function viewLowInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
                console.log(res[i].product_name + ": Low On Stock")
                // start();
                // console.log(res);
                // start();
            } else {
                console.log(res[i].product_name + ": Not low on stock")
                // start();
                // console.log(res);
                // start();

            }
            // start();
        }
        start()
    })
}

// ---------------------- Add Inventory -------------
function addInventory() {
    connection.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        console.log("---------------------------------------")

        inquirer.prompt([{
                type: "input",
                name: "inputID",
                message: "Enter the item_id number of the item you would like to add stock to.",
            },
            {
                type: "input",
                name: "inputNumber",
                message: "How many units of this item would you like to add?",
            }
        ]).then(function(managerAdd) {
            const itemToUpdate = result.find(product => managerAdd.inputID == product.item_id)
            console.log(itemToUpdate)
            const {
                stock_quantity
            } = itemToUpdate
            const newTotal = parseInt(stock_quantity) + parseInt(managerAdd.inputNumber)
            connection.query("UPDATE products SET ? WHERE ?", [{

                stock_quantity: newTotal
            }, {
                item_id: managerAdd.inputID
            }], function (err, res) {

            });
            start();
        });
    })

}

// ---------------------- Add Product ------------------

function addProduct() {
    inquirer.prompt([{
        type: "input",
        name: "inputName",
        message: "What is the name of the item?"
    },{
        type: "input",
        name: "inputDepartment",
        message: "What department does this item belong to?"
    },{
        type: "number",
        name: "inputPrice",
        message: "How much does this item cost?"
    },{
        type: "number",
        name: "inputStock",
        message: "How much of this item are you adding?"
    }]).then(function(addItem) {
        connection.query("INSERT INTO products SET ?", {
            product_name: addItem.inputName,
            department_name: addItem.inputDepartment,
            price: addItem.inputPrice,
            stock_quantity: addItem.inputStock
        }, function(err, res) {
            if (err) throw err;
        })
        start();
    })
}