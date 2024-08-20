const express = require("express")

const app = express()

const routes = require("./routes")

const migrationsRun = require("./database/sqlite/migrations")

const AppError = require("./utils/AppError")

const PORT = 4444

migrationsRun()

app.use(express.json())

app.use(routes)

app.use((error,request,response,next) =>{
    if (error instanceof AppError) {
        response.status(error.statusCode).json({
            Status: "Error",
            message: error.message
        })
    }
    console.log(error)
    response.status(500).json({
        Status: "Error",
        message: "Internal Server error"
    })
})

app.listen(PORT, () =>{
    console.log("Server is running on PORT 4444")
})