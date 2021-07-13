let amountOfUsers;
function newGame(){
    let users = "";
    for(var i = 0; i < amountOfUsers; i++){
        users += $("#username" + i).val()+","
        $("#username" + i).remove()
    }
    $("#newGame").remove()
    $
    console.log("http://localhost:3000/createGame.json?users=" + users.substring(0, users.length-1));
    $.getJSON("http://localhost:3000/createGame.json?names=" + users.substring(0, users.length-1), (res) =>{
        $("<h1></h1>", {
            text: "Your game ID is " + res.success.key + ". DO NOT FORGET THIS!"
        }).prependTo("#content")

    })
}
function addPerUser(){
    amountOfUsers = parseInt($("#userValue").val());
    for(var i = 0; i < amountOfUsers; i++){
        $("<textarea></textarea>", {
            id: "username" + i,
            text: "Insert Username for User " + i,
            class: "userValueInput"
        }).appendTo("#content")
    }
    $("#userValue").remove()
    $("#userPrompt").remove()
    $("#addPerUser").remove()
    $("<button></button>", {
        onClick: "newGame()",
        text: "Create a new league!",
        id: "newGame"
    }).appendTo("#content")
}