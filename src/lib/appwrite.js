import { Client, Databases, ID } from 'appwrite';
const DB_ID = '67773b5a003238cf4d48';
const COLLECTION_ID = '67773b7b0001f6911949';

const client = new Client();
client.setProject('67772c760035a8b772d5');

export const databases = new Databases(client);
export { DB_ID, COLLECTION_ID, ID }