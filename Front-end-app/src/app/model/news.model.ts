import { Source } from "./source.model";

//news model
export class News {
    id ?: number;
    title ?: String;
    description ?: String;
    url ?: String;
    category ?: String;
    urlToImage ?: String;
    country ?: String;
    content ?: String;
    author ?: String;
    publishedAt ?: String;
    source?:Source;
}
