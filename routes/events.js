/*
    Rutas de Eventos  / Event
    host + /api/events
*/
const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')
const { isDate } = require('../helpers/isDate')

const router = Router()

//Todas tienen que pasar por la validacion del JWT
router.use(validarJWT)


//Obtener eventos
router.get('/', getEventos)


//CREAR NUEVO EVENTO
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de termino es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
)


// Actualizar EVENTO
router.put('/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de termino es obligatoria').custom(isDate),
        validarCampos
    ],
    actualizarEvento)

// Borrar EVENTO
router.delete('/:id', eliminarEvento)


module.exports = router