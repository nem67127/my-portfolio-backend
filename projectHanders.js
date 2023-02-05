const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getAllProjects = async(req, res)=>{
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect();
        const db = await client.db("MyPortfolio");
        const results = await db.collection("projects").find().toArray();
        if (results.length <= 0) {
            return res.status(404).json({
                status: 404,
                data: results,
                message: "No projects found",
            });
            }
            
            return res
            .status(200)
            .json({ status: 200, data: results, message: "projects found" });
    }
    catch(err){
        return res
        .status(500)
        .json({ status: 500, data: req.body, message: err.message });
    } finally{
        client.close();
    }
};

module.exports = {getAllProjects};