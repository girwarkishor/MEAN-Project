import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'}) //it just provided one instance in this app no need to add in app.model.ts
export class PostsService{
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient){}

    getPosts(){
       this.http.get<{message: string, posts: any}>(
           "http://localhost:3000/api/posts"
        )
        .pipe(map((postData) => {
            return postData.posts.map(post => {
                return {
                    title: post.title,
                    content: post.content,
                    id: post._id
                };
            });
        }))
       .subscribe((transformedPosts) => {
           this.posts = transformedPosts;
           this.postsUpdated.next([...this.posts]);
       });
        //return [...this.posts]; //coping the original post | spread operator
       // return this.posts;
    }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    getPost(id: string){
        return {...this.posts.find(p => p.id === id)};
    }

    addPost(title: string, content: string){
        const post: Post = {id: null, title: title, content: content};
        this.http.post<{message: string, postId: string}>("http://localhost:3000/api/posts",post)
        .subscribe((responseData) => {
            //console.log(responseData.message); // This will run only when success
            const id = responseData.postId;
            post.id = id;
            this.posts.push(post); // real post copy
            this.postsUpdated.next([...this.posts]) //this is posts copy after updated them
        });
    }

    deletePost(postId: string){
        this.http.delete("http://localhost:3000/api/posts/" +postId)
        .subscribe(() => {
            const updatedPosts = this.posts.filter(post => post.id !== postId);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    } 
}