const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const establishment = await db.Establishment.scope('withHash').findOne({ where: { username } });

    if (!establishment || !(await bcrypt.compare(password, establishment.hash)))
        throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: establishment.id }, config.secret, { expiresIn: '7d' });
    return { ...omitHash(establishment.get()), token };
}

async function getAll() {
    return await db.Establishment.findAll();
}

async function getById(id) {
    return await getEstablishment(id);
}

async function create(params) {
    // validate
    if (await db.Establishment.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save client
    await db.Establishment.create(params);
}

async function update(id, params) {
    const establishment = await getEstablishment(id);

    // validate
    const usernameChanged = params.username && establishment.username !== params.username;
    if (usernameChanged && await db.Establishment.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to client and save
    Object.assign(establishment, params);
    await establishment.save();

    return omitHash(establishment.get());
}

async function _delete(id) {
    const establishment = await getEstablishment(id);
    await establishment.destroy();
}

// helper functions

async function getClient(id) {
    const establishment = await db.Establishment.findByPk(id);
    if (!establishment) throw 'Client not found';
    return establishment;
}

function omitHash(establishment) {
    const { hash, ...establishmentWithoutHash } = establishment;
    return establishmentWithoutHash;
}