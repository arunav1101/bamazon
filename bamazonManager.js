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
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    pos();
                    break;
                case "View Low Inventory":
                    lowInventory();
                    break;
                case "Add to Inventory":
                    updateInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
                case "exit":
                    connection.end()
                    break;
            }
        });
}


async function addProduct() {
    inquirer
        .prompt([{
                name: "pname",
                type: "input",
                message: "Enter the Product name?"
            },
            {
                name: "dept_name",
                type: "input",
                message: "Enter the department_name?"
            },
            {
                name: "price",
                type: "input",
                message: "Enter the Price?"
            },
            {
                name: "qty",
                type: "input",
                message: "Enter the Stock Qty?"
            }
        ]).then(async function (answer) {
            var valQuery = "INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES(?,?,?,?)";
            await connection.query(valQuery, [answer.pname, answer.dept_name, answer.price, answer.qty],
                function (err, res) {
                    if (err) throw err;
                    console.log("Product Added!");
                    runSearch();
                });
        });
}

function updateInventory() {
    inquirer
        .prompt([{
                name: "productId",
                type: "input",
                message: "Enter the ID of the product?"
            },
            {
                name: "quantity",
                type: "input",
                message: "Quatity To be Added?"
            }
        ]).then(function (answer) {
            var valQuery = " select stock_quantity, price from products where ? "
            connection.query(valQuery, {
                item_id: answer.productId
            }, async function (err, res) {
                let newQty = res[0].stock_quantity + parseInt(answer.quantity);
                console.log('Product Updated!');
                await connection.query("UPDATE products SET ? WHERE ?",
                    [{
                            stock_quantity: newQty
                        },
                        {
                            item_id: answer.productId
                        }
                    ]);
                runSearch();
            });
        });
}

function pos() {
    connection.query("select item_Id,product_name, price,stock_quantity from products", function (err, res) {
        res.forEach(item => {
            console.log("ItemId: " + item.item_Id + " || Product Name: " + item.product_name + " || Price: " + item.price + " || Stock :" + item.stock_quantity);
        });
        runSearch();
    });
}

function lowInventory() {
    connection.query("select item_Id,product_name, price,stock_quantity from products where stock_quantity < 5", function (err, res) {
        res.forEach(item => {
            console.log("ItemId: " + item.item_Id + " || Product Name: " + item.product_name + " || Price: " + item.price + " || Stock :" + item.stock_quantity);
        });
        runSearch();
    });
}