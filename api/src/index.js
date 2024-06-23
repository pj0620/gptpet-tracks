import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import { extractGoalDetails, extractTaskDetails, handlMultiGet } from './utils.js';


const app = express();
const port = 4000;

app.use(cors())

// MongoDB connection details
const username = 'gptpet'; // Make sure to encode URI components
const password = 'gptpet';
const dbName = 'posts';

// MongoDB URI - Replace <your_mongodb_cluster_url> with your actual MongoDB cluster URL.
const mongoUri = `mongodb://${username}:${password}@0.0.0.0/${dbName}?authSource=admin`;

// Use body-parser middleware
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

// Create a new MongoClient
const client = new MongoClient(mongoUri);

async function connectToMongo() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        const postsCollection = db.collection('posts');
        const tasksCollection = db.collection('tasks');
        const goalsCollection = db.collection('goals');

        // POST /text endpoint to accept text
        app.post('/text', async (req, res) => {
            console.log('POST /text request')
            const { text } = req.body;
            if (!text) {
                return res.status(400).send({ message: 'Text is required' });
            }
            const date = new Date();

            // base promise to insert new post
            const promises = [postsCollection.insertOne({ text, date })];

            // if new task, add to mongodb
            const newTask = extractTaskDetails(text, date);
            if (newTask) {
              console.log("adding new task: ", newTask);
              promises.push(
                tasksCollection.insertOne(newTask)
              );
            }

            const newGoal = extractGoalDetails(text, date);
            if (newGoal) {
              promises.push(
                goalsCollection.insertOne(newGoal)
              );
            }

            try {
              await Promise.all(promises);
            } catch (e) {
              console.error("error while updating posts", e);
              res.status(500).send({ message: "error while updating posts" });
            }

            res.status(201).send({ message: 'text added successfully' });
        });

        // POST /image endpoint to accept actual images
        app.post('/image', async (req, res) => {
            console.log('POST /image request')
            const { image } = req.body;
            if (!image) {
                return res.status(400).send({ message: 'image is required' });
            }
            const date = new Date();
            await postsCollection.insertOne({ image, date });
            res.status(201).send({ message: 'Image added successfully' });
        });

        // GET /posts endpoint to return both image and text data
        app.get('/posts', async (req, res) => {
          console.log('GET /posts request');
          return await handlMultiGet(req, res, postsCollection, 'posts')
        });

        app.get('/tasks', async (req, res) => {
          console.log('GET /tasks request');
          return await handlMultiGet(req, res, tasksCollection, 'tasks')
        });

        app.get('/goals', async (req, res) => {
          console.log('GET /goals request');
          return await handlMultiGet(req, res, goalsCollection, 'goals')
        });

    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
}

connectToMongo();

// The rest of your Express app goes here

app.listen(port, () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});
