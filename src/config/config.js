const conf = {
    appWriteURL: import.meta.env.VITE_APPWRITE_URL,
    appWriteProjectID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appWriteDatabaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    appWriteTableID: import.meta.env.VITE_APPWRITE_TABLE_ID,
    appWriteBucketID: import.meta.env.VITE_APPWRITE_BUCKET_ID,
    appWriteEditorKey: import.meta.env.VITE_TINY_MCE_KEY
}

export default conf


// Vite env variables already strings hote hain, so tumhare case mein String() unnecessary hai.
// String() lagana actually kabhi-kabhi debugging ko harder bana sakta hai. Agar .env mein variable ka naam galat hai, toh tumhe "undefined" milega instead of clearly seeing undefined
// production grade h yehh, taaki hr baar import.meta.env na krna pde