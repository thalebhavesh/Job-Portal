import { Component, OnInit  } from '@angular/core';
import { JobService } from '../Services/job.service';
import { Router } from '@angular/router';
import { Job } from '../Interfaces/job';

@Component({
  selector: 'app-findjob',
  templateUrl: './findjob.component.html',
  styleUrls: ['./findjob.component.css']
})
export class FindjobComponent implements OnInit {
  jobs: Job[] = [];
  locations: string[] = [];
  filteredJobs: Job[] = [];
  experiences: string[] = [];
  categories: string[] = [];
  selectedLocation: string = 'Anywhere';
  selectedExperience: string = 'Any';
  selectedCategory: string = 'All Category';

  constructor(private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe(data => {
      this.jobs = data;
      this.locations = this.getUniqueLocations(data);
      this.experiences = this.getUniqueExperiences(data);
      this.categories = this.getUniqueCategories(data);
      this.filteredJobs = this.jobs;
    });
  }
  getUniqueLocations(jobs: any[]): string[] {
    const locations = jobs.map(job => job.location);
    return Array.from(new Set(locations)); 
  }

  getUniqueExperiences(jobs: any[]): string[] {
    const experiences = jobs.map(job => job.experience);
    return Array.from(new Set(experiences)); 
  }

  getUniqueCategories(jobs: any[]): string[] {
    const categories = jobs.map(job => job.category);
    return Array.from(new Set(categories)); 
  }

  onLocationChange(event: Event): void {
    const selectedLocation = (event.target as HTMLSelectElement).value;
    this.selectedLocation = selectedLocation;
    this.filterJobs();
  }

  onExperienceChange(event: Event): void {
    const selectedExperience = (event.target as HTMLSelectElement).value;
    this.selectedExperience = selectedExperience;
    this.filterJobs();
  }

  onCategoryChange(event: Event): void {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    this.selectedCategory = selectedCategory;
    this.filterJobs();
  }

  filterJobs(): void {
    this.filteredJobs = this.jobs.filter(job => {
      return (this.selectedLocation === 'Anywhere' || job.location === this.selectedLocation) &&
             (this.selectedExperience === 'Any' || job.experience === this.selectedExperience) &&
             (this.selectedCategory === 'All Category' || job.category === this.selectedCategory);
    });
  }
  viewJobDetails(jobId: number): void {
    console.log(jobId);
    this.router.navigate(['/jobdetails', jobId]);
  }

}
