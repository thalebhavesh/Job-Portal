import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../Services/job.service';
import { Employee } from '../Interfaces/employee';
import { Job } from '../Interfaces/job';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  job: Job | undefined;
  employee: Employee = {
    name: '',
    email: '',
    qualification: '',
    mobile: '',
    resume: '',
    jobTitle: '',
    company: '',
    experience: '',
    location: '',
    salary: ''
  };
  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute,private jobService: JobService,private router: Router) {}

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.jobService.getJobsById(jobId).subscribe((job: Job) => {
        this.job = job;
        this.employee.jobTitle = job.title;
        this.employee.company = job.company;
        this.employee.experience = job.experience;
        this.employee.location = job.location;
        this.employee.salary = job.salary;
      });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.jobService.uploadResume(this.selectedFile).subscribe(
        response => {
          this.employee.resume = response.resumeUrl;
          this.saveApplication();
        },
        error => {
          console.error('Error uploading resume', error);
        }
      );
    } else {
      this.saveApplication();
    }
  }

  saveApplication(): void {
    this.jobService.applyForJob(this.employee).subscribe(
      response => {
        console.log('Application submitted successfully', response);
        alert('Applied successfully');
        this.router.navigate(['/find-jobs']);
      },
      error => {
        console.error('Error submitting application', error);
      }
    );
  }
}