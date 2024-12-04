import postgresDatabase from "../utils/db.js"


class Category {
    constructor(ID, Name) {
        this.ID = ID
        this.name = Name
    }

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

    static async add(categoryName) {

    }

    toEntity() {
        return {
            "CatName": this.name
        }
    }
}

export default Category