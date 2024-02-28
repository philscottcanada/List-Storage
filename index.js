// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

//Lists the Buckets
async function listBuckets() {
  const [buckets] = await storage.getBuckets();

  buckets.map(bucket => {
    listFiles(bucket.name);
  });
}

// The ID of your GCS bucket
async function listFiles(bucketName) {
    // Lists files in the bucket
    const [files] = await storage.bucket(bucketName).getFiles();
  
    files.map(file => {
      getMetadata(file.name, bucketName);
    });
  }

async function getMetadata(fileName, bucketName) {
    // Gets the metadata for the file
    const [metadata] = await storage
      .bucket(bucketName)
      .file(fileName)
      .getMetadata();
  
    console.log('File Name: ',fileName);
    console.log('BucketName: ',bucketName);
    console.log(`Id: ${metadata.id}`);
    console.log(`MediaLink: ${metadata.mediaLink}`);
    console.log(`Metageneration: ${metadata.metageneration}`);
    console.log(`Name: ${metadata.name}`);
    console.log(`Size: ${metadata.size}`);
    console.log(`StorageClass: ${metadata.storageClass}`);
    console.log(`TimeCreated: ${new Date(metadata.timeCreated)}`);
    console.log(`Last Metadata Update: ${new Date(metadata.updated)}`);
    console.log('\n', '\n')
  }
  

listBuckets().catch(console.error);
