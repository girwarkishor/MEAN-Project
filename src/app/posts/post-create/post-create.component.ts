import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
    enteredContent = '';
    enteredTitle = '';
    private mode = 'create';
    private postId: string;
    private post: Post;

    constructor(public postsService: PostsService, public route: ActivatedRoute){}

    ngOnInit(){
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if(paramMap.has('postId')){
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.post = this.postsService.getPost(this.postId);
            } // postId name as written in router
            else{
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    onAddPost(form: NgForm){
        if(form.invalid){
            return;
        }

        this.postsService.addPost(form.value.title, form.value.content);
        form.resetForm();
    }
}