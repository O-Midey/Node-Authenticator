const { client, createCollection, db } = require("..");
const { insertDocument } = require("./helpers");
const { client, db } = require("..");

const findDocument = async (db, collectionName, query) => {
  try {
    await client.connect();
    const collection = db.collection(collectionName);
    const results = await collection.find(query).toArray();
    console.log(results);
    await client.close();
    return;
  } catch (err) {
    console.log("Problem finding document", err);
  } finally {
    await client.close();
  }
};
const updateDocument = async (
  db,
  collectionName,
  selectionQuery,
  updatedDocument
) => {
  try {
    await client.connect();
    const collection = db.collection(collectionName);
    await collection.updateOne(selectionQuery, { $set: updatedDocument });
    console.log("Document updated successfully");
  } catch (err) {
    console.log("Problem updating document", err);
  } finally {
    await client.close();
  }
};

// const run = async () => {
//   try {
//     await client.connect();

//     // Create collections
//     await createCollection(db, "posts");
//     await createCollection(db, "authors");

//     // Insert authors
//     await insertDocument(db, "authors", {
//       name: "John",
//       email: "john@test.com",
//       username: "JohnTheGreat",
//     });
//     await insertDocument(db, "authors", {
//       name: "Dave",
//       email: "dave@test.com",
//       username: "daveTheGreat",
//     });

//     // Insert posts
//     await insertDocument(db, "posts", {
//       content: "Hello world!",
//       author: "JohnTheGreat",
//       tags: "Javascript",
//       date: new Date(Date.now()),
//     });
//   } catch (err) {
//     console.error(err);
//   } finally {
//     await client.close();
//   }
// };
const insertDocument = async (db, collectionName, document) => {
  const collection = db.collection(collectionName);
  try {
    const result = await collection.insertOne(document);
    console.log("Document inserted:", result.insertedId);
  } catch (err) {
    console.error("Error inserting document:", err);
  }
};
exports.insertDocument = insertDocument;

