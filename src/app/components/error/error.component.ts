import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  error_message : String;
  constructor(private propertyService : PropertyService) { }

  ngOnInit(): void {
    this.error_message = this.propertyService.errorMessage;
  }

}
