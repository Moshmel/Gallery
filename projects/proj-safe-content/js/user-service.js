var gUsers = [];
var gNextId = 1;

const USERS_KEY = 'users';
const USER_NAME = 'user';


function createUsers() {
    // var users = loadFromStorage(USERS_KEY)
    var users = false;

    if (!users || users.length === 0) {
        users = [
            createUser('moshe', '12345', Date.now(), true),
            createUser('david', '1111', Date.now(), false),
            createUser('roni', '123123', Date.now(), false),
        ];
    } else {
        gNextId = findNextId();
    }

    gUsers = users;
    saveUsers();

}
function createUser(username, password, lastLoginTime, ifAdmin) {
    var user = {
        id: gNextId++,
        userName: username,
        password: password,
        lastLoginTime: lastLoginTime,
        ifAdmin: ifAdmin
    }
    return user;
}

function findNextId() {
    if (gUsers.length === 0) return 1;
    var max = 0;
    gUsers.forEach(function (user) {
        if (user.id > max) max = user.id;
    })
    return max + 1;
}
function saveUsers() {
    saveToStorage(USERS_KEY, gUsers);

}

function getUsers() {
    return loadFromStorage(USERS_KEY);
}

function doLogin(userName, password) {
    var index = -1;
    var found = gUsers.find(function (user) {
        return (user.userName === userName && user.password === password);


    });
    return found;
}