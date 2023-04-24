import { Component, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Comments } from './comment';
import { map, pluck } from 'rxjs';

@Component({
  selector: 'hinv-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  //three ways to get data from a service


  //directly from the service
  // comments$ = this.commentService.getComments();

  //piping from the router using resolve guard. note this is not a string and the template must manually subscribe using async
  comments$ = this.activatedRoute.data.pipe(pluck('comments'));

  //subscribing directly from the router also using resolve guard
  comments : Comments[] = [];

  constructor(private commentService: CommentService, private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {

    // this.activatedRoute.data.subscribe(data => console.log(data['comments']));

    this.activatedRoute.data.subscribe((data) => {
        this.comments = data['comments']
    });

  }
}
