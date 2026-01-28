import { Component, inject, Injectable, signal } from '@angular/core';
import { TestService } from './test.service';
import { County } from '../../models/county.interface';

import { HttpErrorResponse } from '@angular/common/http';
import { GetVideosResponse } from '../../models/videos.interface';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.html',
  styleUrl: './test.scss',
  standalone: true
})


export class TestComponent {

  httpError = signal<string>('');
  countyCount = signal<number>(0);
  testMessage = signal<string>('');

  counties = signal<County[]>([]);

//   videos: GetVideosResponse = {
  videos = signal<GetVideosResponse>({
    paging: [{
      itemCount: -1,
      pageCount: -1,
      pageNumber: -1,
      pageSize: -1
    }],
    videos: [{
      id: -1,
      title: '',
      date: '',
      summary: '',
      image: '',
      showNotes: '',
      youTubeId: '',
      relatedVideos: [{
        id: -1,
        title: '',
        date: '',
        summary: '',
        image: '',
        showNotes: '',
        youTubeId: '',
        relatedVideos: []
      }]
    }]
  });

  constructor() { 
  }

  private memberService = inject(TestService);

  ngOnInit(): void {
    //this.getCounties();
  }

  getCounties(): void {
    console.log('Loading locations...');
    this.memberService.getLocations()
    .subscribe({
      next: (response) => {
        this.counties.set(response);
        console.log('Number of counties loaded: ' + this.counties().length);
        console.log(this.counties());
     },
      complete:() => {

        //this.countyCount.set(this.counties.location.length);
      },
      error:(err: HttpErrorResponse) => {
        this.httpError.set('Error retrieving counties: ' + err.message);  
        console.log('Error in getCounties: ' + err.message);
        console.log('Error status: ' + err.status);
        
        this.memberService.handleRestError(err);
    }
    });
  }

  loadVideos(): void {
    this.memberService.getVideos()
    .subscribe({
      next: (response) => {
        console.log('Videos loaded successfully.');
        this.videos.set(response);
        console.log('Number of videos loaded: ' + this.videos().videos.length);
        console.log(this.videos());
      },
      complete:() => {
        console.log('Load videos API call completed.');
      },
      error:(err: HttpErrorResponse) => {
        this.memberService.handleRestError(err);
        this.httpError.set('Error retrieving videos: ' + err.message);  

        console.log('Error in loadVideos: ' + err.message);
        console.log('Error status: ' + err.status);
    }
    });
  }


  testApi(): void {
    console.log('Calling test API...');
    this.memberService.sayHello()
    .subscribe({
      next: (response) => {
        this.testMessage.set(response);       
        console.log('Test API response: ' + response);        
      },
      error:(err: HttpErrorResponse) => {
        this.memberService.handleRestError(err);
        this.httpError.set('Error retrieving counties: ' + err.message);  

        console.log('Error in testApi: ' + err.message);
        console.log('Error status: ' + err.status);
    },
      complete:() => {
        console.log('Test API call completed.');
      }
    });
  }


}
