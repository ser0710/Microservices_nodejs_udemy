"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var url = 'https://jsonplaceholder.typicode.com/todos/1';
axios_1.default.get(url).then(function (response) {
    // Response.data has properties of:
    // id
    // title
    // completed
    var todo = response.data;
    var id = todo.id;
    var title = todo.title;
    var completed = todo.completed;
    logTodo(id, title, completed);
});
var logTodo = function (id, title, completed) {
    console.log("\n    The Todo with ID: ".concat(id, "\n    has a title of: ").concat(title, "\n    is it finished? ").concat(completed, "  \n    "));
};
