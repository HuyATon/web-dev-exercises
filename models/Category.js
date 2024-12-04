import postgresDatabase from "../utils/db.js"
import categoryUtils from "../utils/categoryUtils.js"

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
        return postgresDatabase.oneByField("CatID", ID, tableName)
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
}

export default Category