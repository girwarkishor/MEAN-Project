import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'}) //it just provided one instance in this app no need to add in app.model.ts
export class PostsService{
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient){}

    getPosts(){
       this.http.get<{message: string, posts: Post[]}>("http://localhost:3000/api/posts")
       .subscribe((postData) => {
           this.posts = postData.posts;
           this.postsUpdated.next([...this.posts]);
       });
        //return [...this.posts]; //coping the original post | spread operator
       // return this.posts;
    }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string){
        const post: Post = {id: null, title: title, content: content};
        this.posts.push(post); // real post copy
        this.postsUpdated.next([...this.posts]) //this is posts copy after updated them
    }
}