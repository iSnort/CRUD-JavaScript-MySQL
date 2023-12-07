const { Router } = require('express');
const querys = require('../querys');

const router = Router();

router.get('/', async (req, res) => {
    const query = await querys.getAllProducts();
    return res.status(200).json(query);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const query = await querys.getAllProductsById(id);
    if (query.length === 0) {
        return res.status(400).json({ message: 'actor not found' });
    }
    return res.status(200).json(query);
});

router.post('/', async (req, res) => {
    const { Item_Name, Item_Description, Unidad_Medida, Provaider_Name, Item_Status } = req.body;
    const query = await querys.createNewProduct(Item_Name, Item_Description, Unidad_Medida, Provaider_Name, Item_Status)
    return res.status(200).json(query);
});

router.put('/', async (req, res) => {
    const { id, Item_Name, Item_Description } = req.body;
    const query = await querys.updateProduct(id, Item_Name, Item_Description);
    if ( query == null) {
        return res.status(400).json({ message: 'product not found' });
    }
    return res.status(200).json({ message: 'product registered successfully' });
});

router.delete('/', async (req, res) => {
    const { id } = req.body;
    const query = await querys.deleteProduct(id);
    if (query === null) {
        return res.status(400).json({ message: 'product not found' });
    }
    return res.status(200).json({  message: 'product deleted successfully' });
})

module.exports = router;