import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../Services/job.service';
import { Job } from '../Interfaces/job';



@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.css']
})
export class JobdetailsComponent implements OnInit {
  job: string | null = '';
  jobsdata: Job| undefined;

  constructor(private route: ActivatedRoute, private jobService: JobService) {}

  ngOnInit(): void {
    this.job = this.route.snapshot.paramMap.get('id');
    if (this.job) {
      this.jobService.getJobsById(this.job).subscribe((data: Job) => {
        this.jobsdata = data;
      });
    }
}
}
