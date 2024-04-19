const { Store } = require("../models");

const createStore = async (req, res) => {
    // Destructuring object
    const { name, city} = req.body;

    try {
        const newStore = await Store.create({
            name,
            city
        });

        res.status(200).json({
            status: "success",
            data: {
                newStore
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status: "error",
            message: "Failed to create store"
        });
    }
};

const getStoreById = async (req, res) => {
    const storeId = req.params.id;

    try {
        const store = await Store.findByPk(storeId);

        if (!store) { 
            return res.status(404).json({
                status: "error",
                message: "Store not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                store
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status: "error",
            message: "Failed to get store"
        });
    }
};


const getAllStores = async (req, res) => {
    try {
        const stores = await Store.findAll();

        res.status(200).json({
            status: "success",
            data: {
                stores
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status: "error",
            message: "Failed to get all stores"
        });
    }
};

const updateStore = async (req, res) => {
    const storeId = req.params.id;
    const { name, city } = req.body;

    try {
        let store = await Store.findByPk(storeId);

        if (!store) {
            return res.status(404).json({
                status: "error",
                message: "Store not found"
            });
        }

        store = await store.update({
            name,
            city
        });

        res.status(200).json({
            status: "success",
            data: {
                store
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status: "error",
            message: "Failed to update store"
        });
    }
};

const deleteStore = async (req, res) => {
    const storeId = req.params.id;

    try {
        const store = await Store.findByPk(storeId);

        if (!store) {
            return res.status(404).json({
                status: "error",
                message: "Store not found"
            });
        }

        await store.destroy();

        res.status(200).json({
            status: "success",
            message: "Store deleted successfully"
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status: "error",
            message: "Failed to delete Store"
        });
    }
};

module.exports = {
    createStore,
    getStoreById,
    getAllStores,
    updateStore,
    deleteStore
};
