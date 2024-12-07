import postgresDatabase from "../utils/db.js"
import categoryUtils from "../utils/categoryUtils.js"
import Product from '../models/Product.js'

class Category {
    constructor(ID, Name) {
        this.ID = ID
        this.name = Name
    }


    // Database interactions
    static async fetchAll() {
        try {
            const result = await postgresDatabase.all("Categories")
            const categories = result.map(entry => {
                return new Category(entry.CatID, entry.CatName)
            })
            return categories
        }
        catch (error) {
            throw error
        }
    }

    static async getCategoryByID(ID) {
        const tableName = postgresDatabase.generateTableName("Categories")
        const result = await postgresDatabase.oneByField("CatID", ID, tableName)
        if (!result) {
            return null
        }
        return new Category(result.CatID, result.CatName)
    }

    saveToDB() {
        try {

            const tableName = postgresDatabase.generateTableName("Categories")
            const entity = categoryUtils.toEntity(this)
            const result = postgresDatabase.add(entity, tableName)
            return result
        }
        catch (error) {
            throw error
        }
    }

    static async updateName(ID, name) {
        try {
            const data = { "CatName": name }
            const tableName = postgresDatabase.generateTableName("Categories")
            const updateColumns = ["CatName"]
            const condition = `"CatID" = ${ID}`
            const result = await postgresDatabase.updateOne(data, updateColumns, tableName, condition)
        }
        catch (error) {
            throw error
        }
    }

    static async delete(ID) {
        try {
            const products = await Product.fetchAllByCategory(ID)
            for (let i = 0; i < products.length; i++) {
                const product = products[i]
                await Product.deleteRelatedOrders(product.id)
                await Product.delete(product.id)
            }
            const catTableName = postgresDatabase.generateTableName("Categories")
            const catCondition = `"CatID" = ${ID}`
            const catResult = await postgresDatabase.delete(catTableName, catCondition)
        }
        catch (error) {
            throw error
        }
    }

    
}

export default Category