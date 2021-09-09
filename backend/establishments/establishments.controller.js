const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const establishmentService = require('./establishment.service');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);
module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    establishmentService.authenticate(req.body)
        .then(establishment => res.json(establishment))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        middleName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        username: Joi.string().empty(''),
        email: Joi.string().empty(''),
        mobile_number: Joi.string().empty(''),
        temperature: Joi.string().empty(''),
        password: Joi.string().min(6).required(),
        role: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    establishmentService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    establishmentsService.getAll()
        .then(establishments => res.json(establishments))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.establishment);
}

function getById(req, res, next) {
    establishmentService.getById(req.params.id)
        .then(establishment => res.json(establishment))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        middleName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        username: Joi.string().empty(''),
        email: Joi.string().empty(''),
        mobile_number: Joi.string().empty(''),
        temperature: Joi.string().empty(''),
        password: Joi.string().min(6).empty(''),
        role: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    estabishmentService.update(req.params.id, req.body)
        .then(establishment => res.json(establishment))
        .catch(next);
}

function _delete(req, res, next) {
    establishmentService.delete(req.params.id)
        .then(() => res.json({ message: 'client deleted successfully' }))
        .catch(next);
}