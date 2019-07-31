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
    isLoading = false;
    private postsSub: Subscription;

    constructor(public postsService: PostsService){}

    ngOnInit(){
        this.isLoading = true;
        this.postsService.getPosts(); //basic initialization task in ngOnInit function
        this.postsSub=this.postsService.getPostUpdateListener()  //this will help to protect data leak
            .subscribe((posts: Post[]) => {
                this.isLoading = false;
                this.posts = posts;
            });
    }

    onDelete(postId: string) {
        this.postsService.deletePost(postId);
    }

    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }
}