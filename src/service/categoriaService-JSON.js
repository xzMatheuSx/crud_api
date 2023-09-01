const { randomUUID } = require('crypto');
const fs  = require('fs');

const categoriaFile = 'categoria.json';

let categoria = [];


fs.readFile(categoriaFile, 'utf8', (err, data) => {
    if (err) {  
        console.log(err);
        return;
    }else{
        categoria = JSON.parse(data);
    }
});

const findAll = () => {
    return categoria;
}

const find = (id) => {

    let categoria = categoria.find(categoria => categoria.id === id);
    if (!categoria) return false;

    return categoria;
    
};

const create = (name, categoria,price, extras) => {
    price = parseFloat(price);
    if (name=='' || price==='' || price || categoria ==='' || extras ==='' <0) 
    return false;

    const newCategoria = {
        id: randomUUID(),
        name,
        categoria,
        price,
        extras,
    }

    categoria.push(newCategoria);
    writeCategoria();
    return newCategoria;
}

const update = (id, name, categoria,price,extras) =>{
    price = parseFloat(price);
    if (name=='' || price==='' || categoria==='' || extras===''|| price<0) return false;

    const categoriaIndex = categoria.findIndex(categoria => categoria.id === id);

    if(categoriaIndex === -1){
        return false;
    }

    categoria[categoriaIndex] = {
        ...categoria[categoriaIndex],
        name,
        categoria,
        price,
        extras,
    };

    writeCategoria();
    return categoria[categoriaIndex];
}

const destroy = (id) => {
    const categoriaIndex = categoria.findIndex(categoria => categoria.id === id);

    if(categoriaIndex === -1){
        return false;
    }

    categoria.splice(categoriaIndex, 1);

    writeCategoria();
    return true;
}

const writeCategoria = () => {
    fs.writeFile(categoriaFile, JSON.stringify(categoria), (err) => {
        if (err) {
            throw err;
        }
    });
};

module.exports = {
    findAll,
    find,
    create,
    update,
    destroy
}