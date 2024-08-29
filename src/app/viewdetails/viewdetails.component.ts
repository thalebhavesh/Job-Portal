import { Component, OnInit  } from '@angular/core';
import { JobService } from '../Services/job.service';
import { Employee } from '../Interfaces/employee';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.css']
})
export class ViewdetailsComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;
      },
      error => {
        console.error('Error retrieving employee data', error);
      }
    );
  }
}

