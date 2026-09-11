import config from '../config/config'

import { Client, Account, ID } from "appwrite";

export class AuthService_class {
    client = new Client();
    account;

    //constructor k jagah we could have done this in the class but, yeh tabhi chahiye jb user iss class
    //k object define kre
    constructor(){
        this.client
            .setEndpoint(config.appWriteURL)
            .setProject(config.appWriteProjectID)
        this.account = new Account(this.client)
    }

    //SignUp
    //Why Async and await?? -> Jb tk account ni bnega I wish to wait 
    async createAccount({email,password,name}){
        try{
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )

            console.log("ACCOUNT CREATED:", userAccount)

            if(userAccount){
                const session = await this.logIn({email,password})

                console.log("SESSION CREATED:", session)

                return session
            }

            return userAccount

        }catch(error){
            console.log("CREATE ACCOUNT ERROR:", error)
            throw error
        }
    }

    async logIn({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            return null
        }
    }


    async logout(){
        try {
            //this.account.deleteSession('current' / sessionID) bhi hota h jisse 
            //sirf current session delete ho

            //but we want ki user jaha se bhi loggedIn saare jagah se logout ho jaaye
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}


const authService = new AuthService_class();
export default authService

//ek obj memory me ban chuka usko hi sb refer kr rhe h (jo bhi import krte h authService ko)