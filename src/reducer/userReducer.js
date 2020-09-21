let defaultState = {

}

// 通过预定的动作，修改指定的state

export default function userReducer(state=defaultState,action) {
   switch(action.type){
             case "login" : 
                return {
                    username : "Lj",
                    password : 123456
                }
            default :
                return state;
   }
}
