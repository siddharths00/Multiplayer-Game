const users = [];

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

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}    
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if(index!=-1){
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => {
    // console.log("Trying to print\n",users.filter((user) => user.room === room),"\n");
    return users.filter((user) => user.room === room);
}

module.exports = { addUser, removeUser, getUser, getRandomInt, getUsersInRoom, users };