import { Component,OnInit } from '@angular/core';
import { JobService } from '../Services/job.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  jobs: any[] = [];
  featuredJobs: any[] = [];
  categories: any[] = [
    { name: 'Design & Creative', image: 'assets/icons/design-thinking.png', count: 350 },
    { name: 'Design & Development', image: 'assets/icons/ux.png', count: 500 },
    { name: 'Sales & Marketing', image: 'assets/icons/sales.png', count: 350 },
    { name: 'Mobile Application', image: 'assets/icons/app-development.png', count: 150 },
    { name: 'Construction', image: 'assets/icons/hook.png', count: 240 },
    { name: 'Information Technology', image: 'assets/icons/technical-support.png', count: 200 }
  ];
  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe(data => {
      this.jobs = data;
      this.featuredJobs = this.jobs.filter(job => [1, 2, 3, 4].includes(job.id));
    });
  }
}
