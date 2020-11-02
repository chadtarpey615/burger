const connection = require("./connection.js");
function printQuestionMarks(num) {
    let arr = [];

    for (let i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        let value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}
const orm = {
    selectAll: function (table, cb) {
        let queryString = `SELECT * FROM ${table}`;
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
            // console.log(result);
        });
    },

    insertOne: function (table, col, vals, cb) {
        let queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += col.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        connection.query(queryString, vals, (err, result) => {

            if (err) {
                throw err;
            }
            cb(result)

        });

    },

    updateOne: function (table, objColVals, condition, cb) {
        let queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result)

        });
    },

    delete: function (table, condition, cb) {
        let queryString = `DELETE FROM ${table} WHERE ${condition}`;

        connection.query(queryString,  (err, result) => {
            if (err)  {
                throw err
            }
            cb(result);
        });
    }
};

module.exports = orm;


