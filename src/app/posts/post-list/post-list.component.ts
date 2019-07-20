import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
    // posts = [
    //     {title: 'First Post', content: 'This is first post\'s content'},
    //     {title: 'Second Post', content: 'This is second post\'s content'},
    //     {title: 'Third Post', content: 'This is third post\'s content'}
    // ];
    posts:Post[] = [];
    private postsSub: Subscription;

    constructor(public postsService: PostsService){}

    ngOnInit(){
        this.postsService.getPosts(); //basic initialization task in ngOnInit function
        this.postsSub=this.postsService.getPostUpdateListener()  //this will help to protect data leak
            .subscribe((posts: Post[]) => {
                this.posts = posts;
            });
    }

    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }
}