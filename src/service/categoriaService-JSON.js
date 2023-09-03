const { randomUUID } = require('crypto');
const fs = require('fs');

const categoriaFile = 'categoria.json';

var categoria = [];

fs.readFile(categoriaFile, 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    } else {
        categoria = JSON.parse(data);
    }
});

const findAll = () => {
    return categoria;
}

const find = (id) => {
    let foundCategoria = categoria.find(categoria => categoria.id === id);
    if (!foundCategoria) return false;

    return foundCategoria;
};




const create = (name, menu, price, extras) => {
    price = parseFloat(price);
    if (name == '' || price == '' || menu == '' || extras == '' || price < 0)
        return false;

    const newCategoria = {
        id: randomUUID(),
        name,
        menu,
        price,
        extras,
    }

    categoria.push(newCategoria);
    writeCategoria();
    return newCategoria;
}

const update = (id, name, menu, price, extras) => {
    price = parseFloat(price);
    if (name == '' || price == '' || menu == '' || extras == '' || price < 0) return false;

    const categoriaIndex = categoria.findIndex(categoria => categoria.id === id);

    if (categoriaIndex === -1) {
        return false;
    }

    categoria[categoriaIndex] = {
        ...categoria[categoriaIndex],
        name,
        menu,
        price,
        extras,
    };

    writeCategoria();
    return categoria[categoriaIndex];
}

const destroy = (id) => {
    const categoriaIndex = categoria.findIndex(categoria => categoria.id === id);

    if (categoriaIndex === -1) {
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
