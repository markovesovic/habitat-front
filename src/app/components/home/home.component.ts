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
  filter = new RequestBody();

  constructor(
    private propertyService : PropertyService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  search(){
    this.propertyService.getProperties(this.filter, 1).subscribe(res => {
      this.propertyService.response = res;
      this.propertyService.filter_body = this.filter;
      this.router.navigate(['properties']);
    })
  }

}
