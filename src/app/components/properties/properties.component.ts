import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  properties : any;

  constructor(
    private propertyService : PropertyService
  ) { }

  ngOnInit(): void {
    this.properties = this.propertyService.filtered_properties;
  }

}
