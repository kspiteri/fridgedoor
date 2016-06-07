/**
 * Created by keithspiteri on 25/05/2016.
 */

var app = angular.module('myToDoList', []);

app.controller('todoCtrl', function($scope, $http) {

    $scope.selectedTestAccount = null;
    $scope.todoList = [];

    var date = new Date();
    $scope.minDate = date.setDate((new Date()).getDate() + 1);

    $scope.todoAdd = function() {
        $scope.addNew($scope.todoInput, $scope.todoDate);
        $scope.todoInput = "";
        $scope.todoDate = "";
    };

    $scope.addNew = function(description, due_date) {
        $scope.todoList.push({
            description: description,
            due_date: moment(due_date).format('x'),
            due_date_human: moment(due_date).fromNow()
        });
    };

    $scope.todoRemove = function(item) {
        var index = $scope.todoList.indexOf(item);
        $scope.todoList.splice(index, 1);
    };

    $scope.remove = function() {
        var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, function(x) {
            if (!x.done) $scope.todoList.push(x);
        });
    };
});