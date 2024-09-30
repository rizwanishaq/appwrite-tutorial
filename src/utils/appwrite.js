import { Client, Databases } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66f27737001f7c9a6e43'); // Replace with your project ID

export const databases = new Databases(client);
export { ID } from 'appwrite';


