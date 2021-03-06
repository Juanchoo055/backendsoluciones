/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const articuloController = require('../controllers/ArticuloController');
const auth = require('../middlewares/auth');

const router = routerx();


router.get('/list', articuloController.list);
router.post('/add', articuloController.add);
router.put('/activate', articuloController.activate);
router.put('/deactivate', articuloController.deactivate);
router.put('/update', articuloController.update);


module.exports = router;