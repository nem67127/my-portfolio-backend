const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const projects = require("./projects.json");


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImportProjects = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("MyPortfolio");
    await db.collection("projects").insertMany(projects);
    console.log("projects added");
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

batchImportProjects();