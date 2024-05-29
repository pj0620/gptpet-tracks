const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
var cors = require('cors')

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

function isConvertibleToNumber(value) {
  const number = Number(value);
  return !isNaN(number);
}

// Create a new MongoClient
const client = new MongoClient(mongoUri);

async function connectToMongo() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        const postsCollection = db.collection('posts');

        // POST /text endpoint to accept text
        app.post('/text', async (req, res) => {
            console.log('POST /text request')
            const { text } = req.body;
            if (!text) {
                return res.status(400).send({ message: 'Text is required' });
            }
            const date = new Date();
            await postsCollection.insertOne({ text, date });
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
          const { offset, limit, search } = req.query;
        
          if (!isConvertibleToNumber(offset) || !isConvertibleToNumber(limit)) {
            return res.status(400).send({ message: 'pagination must be numbers' });
          }
        
          const query = {};
          if (search) {
            query.text = { $regex: search, $options: 'i' }; // Case-insensitive search
          }
        
          try {
            const posts = await postsCollection.find(query)
              .sort({ date: -1 }) // Sort by date in descending order
              // @ts-ignore
              .skip(parseInt(offset))
              // @ts-ignore
              .limit(parseInt(limit))
              .toArray();
        
            res.status(200).send({ posts });
          } catch (err) {
            console.error('Failed to fetch posts', err);
            res.status(500).send({ message: 'Failed to fetch posts' });
          }
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
