import Category from "../models/Category.js"
import Product from "../models/Product.js"

export default {

    renderCategories: async (req, res, next) => {
        if (req.session.isLoggedIn) {
            try {
                const categories = await Category.fetchAll()
                res.render('categories', {
                    categories: categories
                })
            }
            catch (error) {
                next(error)
            }
        }
        else {
            res.redirect('/auth/login')
        }
    },

    renderCategory: async(req, res, next) => {
        if (req.session.isLoggedIn) {
            try {
                const ID = req.params.id
                const category = await Category.getCategoryByID(ID)
                const categories = await Category.fetchAll()
                const products = await Product.fetchAllByCategory(ID)
                res.render('categories', {
                    categories: categories,
                    category: category,
                    products: products
                })
            }
            catch (error) {
                next(error)
            }
        }
        else {
            res.redirect('/auth/login')
        }
    },

    addCategory: async(req, res) => {
        try {
            const categoryName = req.body.categoryName
            const category = new Category(null, categoryName)
            const result = await category.saveToDB()
            res.redirect('/categories')
        }
        catch (error) {
            next(error)
        }
    },

    updateCategory: async(req, res, next) => {
        try {
            const ID = req.params.id
            const newName = req.body.newCategoryName
            const result = await Category.updateName(ID, newName)
            res.status(200).json(result)
        }
        catch (error) {
            next(error)
        }
    },

    deleteCategory: async(req, res, next) => {
        try {
            const ID = req.params.id
            const result = await Category.delete(ID)
            res.status(200).json(result)
        }
        catch (error) {
            next(error)
        }
    }
}