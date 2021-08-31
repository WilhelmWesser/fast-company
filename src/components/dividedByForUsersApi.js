import API from "../API";
const gotUsers = API.users.fetchAll();
const usersInBlocks = [];
let newBlock = [];
for (let i = 0; i < gotUsers.length; i++) {
    newBlock.push(gotUsers[i]);
    if (newBlock.length === 4) {
        usersInBlocks.push(newBlock);
        newBlock = [];
    }
}
export default usersInBlocks;
