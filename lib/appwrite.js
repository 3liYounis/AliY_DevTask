import { Client, Account, ID, Databases, Query} from 'react-native-appwrite';
export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.ali.weather',
    projectId: '677019da000e33c78d73',
    databaseId: '67701b520012fb583b85',
    userCollectionId: '67701b72002839c323f4 '
}
const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint) 
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)
;
const account = new Account(client);
const databases = new Databases(client)
export const createUser = async(username,email,password) => {
    try{
        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) throw Error;
        await SignIn(email,password);
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
            }
        )
        return newUser;
    }
    catch(error){
        console.log(error);
    }
}
 export const signIn = async(email,password) => {
    try{
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    }
    catch(error){
        console.log(error)
    }
 }
 export const getCurrentUser = async() => {
    try{
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId
            [Query.equal('accountId',currentAccount.$id)]
        )
        if (!createUser) throw Error;
        return currentUser.documents[0];
    }
    catch(error){
        
    }
 }