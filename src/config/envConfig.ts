
if (process.env.NODE_ENV !== "production")
{
    require("dotenv").config()
}

export const configConstants = {
    PORT: process.env.PORT,
    MONGODB_USERNAME: process.env.MONGODB_USERNAME,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    JWT_SECRET:process.env.JWT_SECRET,
    MONGODB_IP:process.env.MONGODB_IP,
    MONGODB_PORT:process.env.MONGODB_PORT,
    MONGODB_DATABASE:process.env.MONGODB_DATABASE
}