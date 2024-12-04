import Category from "../models/Category.js"
import Product from "../models/Product.js"
import postgresDatabase from "../utils/db.js"

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
            const entity = category.toEntity()
            const tableName = postgresDatabase.generateTableName("Categories")

            const result = await postgresDatabase.add(entity, tableName)
            res.redirect('/categories')
        }
        catch (error) {
            next(error)
        }
    }
}