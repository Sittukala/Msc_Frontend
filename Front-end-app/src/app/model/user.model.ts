import { News } from "./news.model";

//User Model
export class User {
uid ?: number;
emailId ?:string;
userName ?:string;
lastname ?:string;
phoneNumber ?: string;
password ?: String;
location ?: String;
preferredCategory ?: String[];
gender ?:String;
likedList ?: News[];
favoriteList ?: News[];
savedList ?: News[];
map?: any;
}
