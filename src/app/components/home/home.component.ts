import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestBody } from 'src/app/models/request-body';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  filter : RequestBody = {
    building_type: null,
    min_price: null,
    max_price: null,
    size_min: null,
    size_max: null,
    params: {}
  };

  constructor(
    private propertyService : PropertyService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  search(){
    this.propertyService.getProperties(this.filter, 1).subscribe(res => {
      this.propertyService.filtered_properties = res.data;
      this.router.navigate(['properties']);
    })
  }

}