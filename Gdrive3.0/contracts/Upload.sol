// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0 <0.9.0;

contract Upload{
    // Saurav
    struct Access{
        address user; //kis user ko access diya hai saurav ne uska info store krenge
        bool access; //true or false
    }
    mapping(address=>string[]) value;
    mapping(address=>mapping(address=>bool)) ownership;
    mapping(address=>Access[]) accessList;
    mapping(address=>mapping(address=>bool)) previousData;

    //  if we use node js then i can keep that information in my server.
    // but now we are totaly blockchain dependent so all information keep in blockchain
    

    // Now we are creating a function, User can add URL of images who want to store
    function add(address _user,string memory url) external{
        //because of dynamic array we push URL
        value[_user].push(url);
    }
    // allow user to giver acces
    function allow(address user) external{ // public or external    def
        ownership[msg.sender][user]=true;
        if(previousData[msg.sender][user]){
            // check previous data pehle se True to nahi hai
            for(uint i=0; i<accessList[msg.sender].length; i++)
            {
                if(accessList[msg.sender][i].user==user){
                    accessList[msg.sender][i].access=true;
                }
            }
        }
        else{
            accessList[msg.sender].push(Access(user,true));     // def.access = true
            previousData[msg.sender][user]=true;
        }
        // when we give acces to user then we need to store user information into AccessList
        // accessList[msg.sender].push(Access(user,true));  // access allow  0xder -> true

    }
    // function to disAllow                                 to handle this proble we maintain previous data
    function disallow(address user) public{
        ownership[msg.sender][user]=false;
        // user ka ownership disallow kr diya
        // same thing we need to update in AccessList
        for(uint i=0; i<accessList[msg.sender].length; i++){
            if(accessList[msg.sender][i].user==user){       // acces revoke  0xder -> false
                // particular user ko accessList me find krne k liye arr[i]
                accessList[msg.sender][i].access=false;  // def.access = false
                // we can't delete the data but we can change the array element data


            }
        }
    }

    function display(address _user) external view returns(string[] memory){
        // first check user has access or not
        require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
        return value[_user];
    }

    function shareAccess() public view returns(Access[] memory){
        return accessList[msg.sender];
    }
}