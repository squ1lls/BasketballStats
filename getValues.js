function getLeagueInfo(){
    $.getJSON("http://localhost:3000/getGameInfo.json?uuid=" + $("#uuidInput").val(), (data) =>{
        if(data.error=="uuid is wrong"){alert("YOUR UUID IS WRONG IDIOTIOT")}else{
         $("#content").empty()
        console.log(data)
        $("<table></table>", {
            id: "statsTable"
        }).appendTo("#content")
        $("<th>Name</th>").appendTo("#statsTable")
        $("<th>Attempted Threes</th>").appendTo("#statsTable")
        $("<th>Attempted Twos</th>").appendTo("#statsTable")
        $("<th>Made Threes</th>").appendTo("#statsTable")
        $("<th>Made Twos</th>").appendTo("#statsTable")
        $("<th>Rebounds</th>").appendTo("#statsTable")
        $("<th>Shots</th>").appendTo("#statsTable")
        $("<th>Steals</th>").appendTo("#statsTable")
        let counter = 0;
        //idk counter seems to work for this situation
        for(k in data.players){
            if(k=="id"){break;}
            console.log(k)
            $("<tr></tr>", {
                id: "tableRow" + counter
            }).appendTo("#statsTable")
            $("<td></td>", {
                text: k
            }).appendTo("#tableRow" + counter)
            for(key in data.players[k]){
                $("<td></td", {
                    text: data.players[k][key]
                }).appendTo("#tableRow" + counter)
            }counter++
    
        }
    }})
    }