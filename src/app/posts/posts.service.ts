import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'}) //it just provided one instance in this app no need to add in app.model.ts
export class PostsService{
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    getPosts(){
       return [...this.posts]; //coping the original post | spread operator
       // return this.posts;
    }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string){
        const post: Post = {title: title, content: content};
        this.posts.push(post); // real post copy
        this.postsUpdated.next([...this.posts]) //this is posts copy after updated them
    }
}