const auth = require('../auth');
const store = require('../../../store/dummy');

const { nanoid } = require('nanoid');
// import { nanoid } from 'nanoid';

const TABLA = 'user'; 

module.exports = function(injectedStore){
    let store = injectedStore;

    if(!store){
        store = require('../../../store/dummy');
    }

    function list(){
        return store.list(TABLA)
    }

    function get(id){
        return store.get(TABLA, id)
    }

    async function upsert(data){
        const user = {
            id: data.id ?? nanoid(),
            name: data.name,
            username: data.username ?? data.name.replace(/\s+/g, "").toLowerCase(),
        }

        if(data.password || data.username){
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: data.password,
            })
        }
        return store.upsert(TABLA, user)
    }

    function remove(id){
        return store.remove(TABLA, id)
    }

    return {
        list,
        get,
        upsert,
        remove
    }
}

// module.exports = {
//     list
// }