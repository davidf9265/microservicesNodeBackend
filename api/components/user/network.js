const express = require('express');

const response = require('../../../network/response.js');
const controller = require('./index.js')

const router = express.Router();

router.get('/', (req, res) => {
    controller.list()
        .then((lista) => {
            response.success(req, res, lista,200);
        })
        .catch(e => {
            response.error(req, res, e.message, 500);
        });
});

router.get('/:id', (req, res) => {
    controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user,200);
        })
        .catch(e => {
            response.error(req, res, e.message, 500);
        }
    );
});

router.post('/upsert', (req, res) => {
    controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user,200);
        })
        .catch(e => {
            response.error(req, res, e.message, 500);
        }
    );
});

router.delete('/remove/:id', (req, res) => {
    controller.remove(req.params.id)
        .then((serviceResponse) => {
            response.success(req, res, serviceResponse ? "deleted user" : "user not found",200);
        })
        .catch(e => {
            console.log(e)
            response.error(req, res, e.message, 500);
        }
    );
});

module.exports = router;
