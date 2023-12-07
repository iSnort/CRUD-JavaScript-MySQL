const connection = require('./connection');

const getAllProducts = async () => {
    const [query] = await connection.execute('SELECT * FROM ');
    return query;
}

const getAllProductsById = async () => {
    const [query] = await connection.execute('SELECT * FROM WHERE actor_id = ?', [id]);
    return query;
}


const createNewProduct = async (Item_Name, Item_Description, Unidad_Medida, Provaider_Name, Item_Status) => {
    const [query] = await connection.execute(`INSERT INTO products (Item_Name, Item_Description, Unidad_Medida, Provaider_Name, Item_Status) VALUES (?, ?, ?, ?, ?)`, [Item_Name, Item_Description, Unidad_Medida, Provaider_Name, Item_Status]);
    const item = await getAllProductsById(query.insertId);
    return item;
}

const updateProduct = async (id, Item_Name, Item_Description) => {
    const item = await getAllProductsById(id);
    if (item.length === 0) {
        return null;
    }
    const [query] = await connection.execute(`UPDATE products set Item_Name = ?, Item_Description = ? WHERE Item_Id = ?`, [Item_Name, Item_Description, id]);
    return query;
}

const deleteProduct = async (id) => {
    const item = await getAllProductsById(id);
    if (item.length === 0) {
        return null
    }
    const [query] = await connection.execute(`DELETE FROM products WHERE product_id = ?`, [id]);
    return query;
}

module.exports = { getAllProducts, getAllProductsById, createNewProduct, updateProduct, deleteProduct }