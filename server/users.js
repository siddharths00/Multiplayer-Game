const users = [];
/**
 * 
 * @param {Object} roomObject - Takes user details
 * @returns {Object} - It returns User Object
 */

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
 * 
 * This method generates a random numer
 * @param {number} max - Takes number as input
 * @returns {number} - a random number
 */
const getRandomInt = (max) => {
    return Math.floor(Math.random() * max); 
}    

/**
 * This method removes the player with particular id
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
 * This method returns the player with the requested id
 * @param {number} id - takes the id as input
 * @returns {Object} - returns the user object
 */
const getUser = (id) => users.find((user) => user.id === id);
/**
 * This method returnsall users in the room
 * @param {number} room - takes the room as input
 * @returns {Array} - returns the array of the player in the room
 */
const getUsersInRoom = (room) => {
    console.log(users.filter((user) => user.room === room), room,'*****');
    return users.filter((user) => user.room === room);
}

const alreadyInRoom = (name, room) => {
    return users;
}

module.exports = { addUser, removeUser, getUser, getRandomInt, alreadyInRoom, getUsersInRoom, users };