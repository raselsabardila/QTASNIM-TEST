const whitelist = []

const setting = {
    origin: (origin, callback) => {
        if(!origin || whitelist.includes(origin)) return callback(null, true)
    
        return new Error("Error not allowed by CORS.")
    } 
}

module.exports = setting