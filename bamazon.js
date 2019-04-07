const mysql = require("mysql");
const inquirer = require("inquirer");
const atob = require('atob');

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: atob("eW91clJvb3RQYXNzd29yZA=="),
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Order",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {

                case "Order":
                    productOrder();
                    break;

                case "exit":
                    connection.end()
                    process.exit();
                    break;
            }
        });
}

function productOrder() {
    inquirer
        .prompt([{
                name: "productId",
                type: "input",
                message: "Enter the ID of the product?"
            },
            {
                name: "quantity",
                type: "input",
                message: "Quatity required?"
            }
        ]).then(function (answer) {
            var valQuery = " select stock_quantity, price from products where ? "
            connection.query(valQuery, {
                item_id: answer.productId
            }, async function (err, res) {
                console.log('Qty Left -> ', res[0].stock_quantity);
                console.log('Cost is -> ', res[0].price);
                if (res[0].stock_quantity >= answer.quantity) {
                    console.log('Wait! Submitting Order');
                    let leftQuantity = parseInt(res[0].stock_quantity) - parseInt(answer.quantity)
                    await orderSubmit(leftQuantity, answer.productId).then(() => {
                        console.log('Congrats! Your Order Submitted')
                        console.log('Total Cost is ', res[0].price * parseInt(answer.quantity))

                    })
                } else {
                    console.log('Sorry! Insufficient Quantity')
                }
                runSearch();
            });
        });
}

async function orderSubmit(qty, productId) {
    await connection.query(
        "UPDATE products SET ? WHERE ?",
        [{
                stock_quantity: qty
            },
            {
                item_id: productId
            }
        ]);
}