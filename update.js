function getGameInfo(){
    console.log("http://localhost:3000/updateValue.json?player=" + $("#playerName").val() + "&type=" + $('input[type="radio"][name="stat"]:checked').val() + "&uuid=" + $("#uuid").val() + "&value=" + parseInt($("#statVal").val()));
    $.getJSON("http://localhost:3000/updateValue.json?player=" + $("#playerName").val() + "&type=" + $('input[type="radio"][name="stat"]:checked').val() + "&uuid=" + $("#uuid").val() + "&value=" + parseInt($("#statVal").val()), (res) =>{
        console.log(res);
    })
}