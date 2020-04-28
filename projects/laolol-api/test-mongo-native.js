require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
  if (err) {
    console.error('err', err);
  } else {
    const collection = client.db(process.env.MONGODB_NAME).collection('items');
    // perform actions on the collection object
    console.log('data', collection);
  }
  client.close();
});
