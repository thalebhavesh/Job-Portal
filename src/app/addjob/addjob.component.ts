import { Component } from '@angular/core';
import { Job } from '../Interfaces/job';
import { Router } from '@angular/router';
import { JobService } from '../Services/job.service';

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})
export class AddjobComponent {
  job: Job = {
    id: 0,
    title: '',
    company: '',
    location: '',
    experience: '',
    category: '',
    salary: '',
    image: '',
    description: '',
    skills: '',
    postdate: '',
    vacancy: '',
    jobtype: ''
  };
  jobs: Job[] = [];
  locations: string[] = ['Mumbai', 'Pune', 'Bangalore', 'Hyderabad', 'Chennai'];
  experiences: string[] = ['0-1 years', '1-2 years', '2-3 years', '3-5 years', '5+ years'];
  categories: string[] = ['Software Development', 'Design', 'DevOps', 'Digital Marketing', 'Sales', 'HR', 'Finance'];
  salaries: string[] = ['0-1 LPA', '1-2 LPA', '2-3 LPA', '3-5 LPA', '5+ LPA'];
  jobTypes: string[] = ['Full Time', 'Part Time', 'Internship', 'Contract'];

  selectedFile: File | null = null;

  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.jobService.getJobs().subscribe(data => {
      this.jobs = data;
      this.generateJobId();
    });
  }

  generateJobId(): void {
    if (this.jobs.length > 0) {
      const maxId = Math.max(...this.jobs.map(job => job.id));
      this.job.id = maxId + 1;
    } else {
      this.job.id = 1;
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.jobService.uploadImage(this.selectedFile).subscribe(
        response => {
          this.job.image = response.imageUrl;
          this.saveJob();
        },
        error => {
          console.error('Error uploading image', error);
        }
      );
    } else {
      this.saveJob();
    }
  }
  saveJob(): void {
    this.jobService.addJob(this.job).subscribe(
      response => {
        console.log('Job posted successfully', response);
        this.router.navigate(['/find-jobs']);
      },
      error => {
        console.error('Error posting job', error);
      }
    );
  }
}
