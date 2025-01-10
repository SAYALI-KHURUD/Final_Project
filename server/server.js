const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");

// MongoDB connection URL and client
const URL = "mongodb://localhost:27017";
const client = new MongoClient(URL);

// Express app setup
const app = express();
const port = 5200;
app.use(cors({
    origin: 'http://localhost:4200'  // Angular frontend port
  }));
  
// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection helper function
async function GetConnection() {
    const result = await client.connect();
    const db = result.db("Resto"); // Database name
    return db.collection("Record"); // Collection name
}
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String,
});
const User = mongoose.model('User', userSchema);
app.post('/signup', (req, res) => {
  const { name, email, mobile, password } = req.body;

  const newUser = new User({ name, email, mobile, password });
  newUser.save()
    .then(user => {
      res.status(201).json({ message: 'User signed up successfully', user });
    })
    .catch(err => {
      res.status(400).json({ message: 'Error signing up user', error: err });
    });
});

// Start Server
//const port = 5200;
app.listen(port, () => console.log(`Server running on port ${port}`));

// CRUD Endpoints

// 1. Fetch all records
app.get("/api/record", async (req, res) => {
    try {
        const collection = await GetConnection();
        const records = await collection.find().toArray();
        res.json(records);
    } catch (err) {
        res.status(500).send({ error: "Failed to fetch data" });
    }
});

// 2. Fetch a single record by ID
app.get("/api/record/:id", async (req, res) => {
    try {
        const collection = await GetConnection();
        const record = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (record) {
            res.json(record);
        } else {
            res.status(404).send({ error: "Record not found" });
        }
    } catch (err) {
        res.status(500).send({ error: "Failed to fetch data" });
    }
});

// 3. Create a new record
app.post("/api/record", async (req, res) => {
    try {
        const collection = await GetConnection();
        const result = await collection.insertOne(req.body);
        res.status(201).send(result);
    } catch (err) {
        res.status(500).send({ error: "Failed to add data" });
    }
});

// 4. Update a record by ID
// Update a record by ID
// 4. Update a record by ID
app.put("/api/record/:id", async (req, res) => {
    try {
      const collection = await GetConnection();
  
      // Remove _id from the request body to prevent it from being updated
      const { _id, ...updateData } = req.body; // Destructure to remove _id
  
      const result = await collection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: updateData } // Only update the rest of the fields
      );
  
      if (result.matchedCount > 0) {
        res.send({ message: "Record updated successfully" });
      } else {
        res.status(404).send({ error: "Record not found" });
      }
    } catch (err) {
      console.error("Update Error:", err);
      res.status(500).send({ error: "Failed to update data" });
    }
  });
  
  // Delete Record
  // DELETE a record by ID
app.delete("/api/record/:id", async (req, res) => {
    try {
      const collection = await GetConnection();
      const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  
      if (result.deletedCount > 0) {
        res.send({ message: "Record deleted successfully" });
      } else {
        res.status(404).send({ error: "Record not found" });
      }
    } catch (err) {
      console.error('Error deleting record:', err);
      res.status(500).send({ error: "Failed to delete data" });
    }
  });
  
  
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
