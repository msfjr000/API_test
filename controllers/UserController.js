const databaseConection = require("../database/sqlite")
const AppError = require("../utils/AppError")
const {hash} = require("bcryptjs")

class UserController {
    async createUser (request,response) {
        const {name, email, password} = request.body

        const database = await databaseConection()

        const userExists = await database.get("select * from users where email = (?)",[email])

       if (userExists) {
        throw new AppError("This e-mail is already in use")
       } 

        const hashedPassword = await hash(password, 8)

        database.run("insert into users (name,email,password) values (?,?,?)", [name,email,hashedPassword])

        return response.status(202).json({
            message: "Request successfuly registered"
        })
    }
}

module.exports = UserController