import postgresDatabase from "../utils/db.js"
import Category from "./Category.js";

class Product {

    constructor(row) {
        this.id = row.ProID
        this.name = row.ProName
        this.tinyDes = row.TinyDes
        this.fullDes = row.FullDes
        this.price = row.Price
        this.categoryID = row.CatID
        this.quantity = row.Quantity
    }

    // Database interactions
    static async fetchAllByCategory(categoryID) {
        try {
            const tableName = postgresDatabase.generateTableName("Products")
            const items = await postgresDatabase.allByField("CatID", categoryID, tableName)

            const products = items.map(row => new Product(row) )
            return products
        }
        catch (error) {
            throw error
        }
    }

    static async delete(productID) {
        try {
            const tableName = postgresDatabase.generateTableName("Products")
            const condition = `"ProID" = ${productID}`
            const result = await postgresDatabase.delete(tableName, condition)
        }
        catch (error) {
            throw error
        }
    }
    static async deleteRelatedOrders(productID) {
        try {
            const tableName = postgresDatabase.generateTableName("OrderDetails")
            const condition = `"ProID" = ${productID}`
            const result = await postgresDatabase.delete(tableName, condition)
        }
        catch (error) {
            throw error
        }
    }
}

export default Product