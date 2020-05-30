function getOutputMethod(input){ 
       
    let output = [];
    
    
    function generateListOfPersons(input_1){
        
        if(typeof input_1 != "object"){
            
            return;
        }
        
        let person = {
	        name: input_1.name,
        	friends: getFriends(input_1.friends)
    	}
        
        output.push(person);

        input_1.friends.forEach(function(friend){
            if(typeof friend == "object"){
                generateListOfPersons(friend);
            }
        });
    }

	function getFriends(friends){    
    
    		let out_friends = [];
    
    		for(let i=0; i<friends.length; i++){
        		if( typeof friends[i] == "object" ){
            			out_friends.push(friends[i].name);
        		}else{
            			out_friends.push(friends[i]);
        		}
    		}
    		return out_friends;
	}
    
    generateListOfPersons(input);
    return output;
}

let input_obj = {
    name: 'a',
    friends: [
        'b',
        'c',
        'd',
        { 
            name: 'e',
            friends: [
                'f',
                'g',
                'h',
                { 
                    name: 'i',
                    friends: [
                        'j',
                        'k',
                        'l'
                    ]
                },
                { 
                    name: 'm',
                    friends: [
                        'n',
                        'o',
                        'p'
                    ]
                }
            ]
        }
    ]
};

console.log(getOutputMethod(input_obj));