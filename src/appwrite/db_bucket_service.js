import config from '../config/config'

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service_class{
    client = new Client()
    databases;
    storage;

    //same concept, account banna chahiye jb object create ho iss class k 
    constructor(){
        this.client
            .setEndpoint(config.appWriteURL)
            .setProject(config.appWriteProjectID)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    //Slug is used here as document ID
    async createPost({ title, slug, content, featuredImage, status, userId }){
        console.log(slug)
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseID,
                config.appWriteTableID,
                // slug = human-readable unique ID (eg text=Hello World, slug=Hello-world)
                slug,
                //iske jagah ID.unique() bhi use kr skte h
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
                //kya kya save krna chahte ho
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
//userID maine nhi diya because I want ki jisne post creare kiya h sirf whi update kr paaye
//so no choice of userID while post updation
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseID,
                config.appWriteTableID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseID,
                config.appWriteTableID,
                slug
            )
            return true
        } catch (error) {
            return false
        }
    }


    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseID,
                config.appWriteTableID,
                slug
            )
            
        } catch (error) {
            return false;    
        }
    }
    //listDocuments() method se uss collection ID k corresponding saare documents mil jaayenge



    //indexes lagani pdegi query use krne k liye, agr indexes ni lagayi h toh query ni use kr skte
    //Conceptually tum index ko ek map/dictionary ki tarah soch sakte ho
    //Query.equal("status", "active")
    // aayi toh database index se directly "active" ke corresponding documents locate kar sakta hai.
    async getActivePosts(queries = [Query.equal("status", "active")]){
        //Redux wale code mein status boolean hai, but agar tum Appwrite ke post status field ki baat kar rahe ho, aur usme value "active" stored hai

        //jb saari queries kisi index k liye match kre tbhi uske corresponding docID kaam me aayenge
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseID,
                config.appWriteTableID,
                queries
            )
        } catch (error) {
            console.log("GET ACTIVE POSTS ERROR:", error); // 👈
            throw error; // 👈
        }
    }

    //file related service


    //file k naam ni dena uska actual blob dena h as parameter
    async uploadFile(file){
        try {
            //yha se return me file k ID jaayega and usi ko create Post me as featured image pass kr rhe h 
            return await this.storage.createFile(
                config.appWriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }
    }

    
    async deleteFile(fileId){
        try {
           await this.storage.deleteFile(
            config.appWriteBucketID,
            fileId
           ) 
           return true
        } catch (error) {
            return false
        }
    }

    //quick response deta h yehh, sidha resource k url mil jaata h 
    getFilePreview(fileId){
        return this.storage.getFileView(
            config.appWriteBucketID,
            fileId
        )
    }
}

const service = new Service_class()

export default service;