const users = [];
/**
 * <hr/>
 * Add User method add the user with the specified details to the particular room.
 * The parameters to the function specifies the the name of the user, id assigned to user
 * and the room to which the user wants to enter.
 * After adding particular user to the specified room the method also returns the the details 
 * of the user added to the room.
 * @param {number} id  - Unique Id assigned to user
 * @param {string} name - The name of the user
 * @param {number} room - The room id to which the user enter
 * @returns {Object} - It returns User details { id, name, room}
 * 
 * 
 * */
const addUser = ({id, name, room}) => {

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    
    const existingUser = users.find((user) => user.room === room && user.name === name);
    if(existingUser){
        return {error: 'Username already exists'};
    }
    // If a user already exists then the error will throw the control out of this function
    // and the new user will never be created.

    const user = {id, name, room};
    users.push(user);
    console.log(getUsersInRoom(room), " was pushed\n")
    return { user };
};
/**
 * <hr/>
 * The getRandomInt method generates a random number with max value given as parameter
 * This random number is then used for placing the fruits randomly over the board.
 * @param {number} max - takes maximum value which is the upper limit of random number to be generated.
 * @returns {number} - returns a random number from 0 to max-1
 */
const getRandomInt = (max) => {
    return Math.floor(Math.random() * max); 
}    

/**
 * <hr/>
 * This method is used to remove the player with specified id. The client with the specified is 
 * removed from the list of users and the updated list of available users is the returned by the function.
 * 
 * @param {number} id - takes the id of the player
 * @returns {Array} - returns array after removing the player
 * 
 */
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if(index!==-1){
        return users.splice(index, 1)[0];
    }
};
/**
 * <hr/>
 * The getUser method is used to get the details of the user. The id of the user of which details are required
 * is given as input parameter and it looks at the list of users and return the user details of the user corresponding 
 * to id.
 * 
 * @param {number} id - takes the id as of the user as a parameter
 * @returns {Object} - returns the user details as User Object
 */
const getUser = (id) => users.find((user) => user.id === id);
/**
 * <hr/>
 * The method getUsersInRoom is used to return all the users in a particular room.
 * The method takes the parameter room id. Looks over all the users and returns the users in the
 * specified room.
 * @param {number} room - takes the room id as input
 * @returns {Array} - returns the array of the all the players in particular room
 */
const getUsersInRoom = (room) => {
    console.log(users.filter((user) => user.room === room), room,'*****');
    return users.filter((user) => user.room === room);
}
/**
 * <hr/>
 * The alreadyInRoom method is used to check if the user with given name is in the 
 * particluar room is already in the there.
 * This is to ensure that no room have 2 players wtih same name.
 * @param {String} name
 * @param {number} room
 */
const alreadyInRoom = (name, room) => {
    return users;
}

module.exports = { addUser, removeUser, getUser, getRandomInt, alreadyInRoom, getUsersInRoom, users };