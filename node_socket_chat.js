var server = require("net");

var names  = [];
var people = [];
function timeNow() {
  return new Date().toLocaleTimeString();;
}
var s = server.createServer(function(socket) {
    people.push(socket);
    socket.write("What is your name:  ");
    socket.on("data",function(data){
    data = data.toString().replace(/(\r\n\t|\n|\r\t)/gm,"")
    var socketID = people.indexOf(socket);
        if(!names[socketID]){
	   names[socketID] = data;
	   socket.write("Welcome "+data+"\n");
	   socket.write("This is Talha's PC Socket Chatter\n");
    var name     = names[socketID];
        }else{
	var name     = names[socketID];
	  for(var i = 0; i<people.length; i++){
	      if(people[i] == socket) continue;
	      people[i].write("\n"+name+"-"+timeNow()+" >  "+data+"\n");
	      console.log("\n"+name+"-"+timeNow()+" >  "+data+"\n");
	  }
	}
      socket.write(name+" >  ");
    });
    socket.on("end", function(data){
	var socketID = people.indexOf(socket);
        people.splice(socketID,1);
    });

});

s.listen("8000");
