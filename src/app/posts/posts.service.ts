import { Post } from './post.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'}) //it just provided one instance in this app no need to add in app.model.ts
export class PostsService{
    private posts: Post[] = [];

    getPosts(){
        return [...this.posts]; //coping the original post | sparator operator
    }

    addPost(title: string, content: string){
        const post: Post = {title: title, content: content};
        this.posts.push(post);
    }
}