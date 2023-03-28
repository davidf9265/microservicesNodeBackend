const db = {
    'user': [
        {id: '1', name: 'Carlos'},
    ]
};

async function list(tabla){
    return db[tabla] || [];
};

async function get(tabla, id){
    let col = await list(tabla);
    return col.filter( item => item.id === id)[0] || null;
};

async function upsert(tabla, data){
    if(!db[tabla]){
        db[tabla] = [];
    }

    db[tabla].push(data);

    console.log(db)
    return data;
};

async function remove(tabla, id){
    let filteredData = db[tabla].filter( item => item.id !== id);

    if(db[tabla] !== filteredData){
        db[tabla] = filteredData;
        return true;
    }
    else{
        return false;
    }
};

async function query(tabla, q){
    let col = await list(tabla);
    let keys = Object.keys(q);
    let key = keys[0];

    return col.filter(item => item[key] === q[key])[0] || null;

    if(!db[tabla]){
        db[tabla] = [];
    }
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}