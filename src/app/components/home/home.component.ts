import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
    private propertyService: PropertyService,
    private router: Router,
    private meta: Meta,
    private title: Title
  ) { 
    this.meta.addTags([
      { name: 'home', content: "Home page of an property renting and selling app" },
      { name: 'author', content: "Habitat company" }, 
      { name: 'keywords', content: "Property, Real Estate, Flat, House, Location" },
      { name: 'viewport', contetn: 'width=device-width, initial-scale=1'},
      { name: 'description', content: "A place for you to buy or rent property (real-estate) in Belgrade, Serbia. Look at the catalogue of more than 5000 available properties." }
    ])

    this.title.setTitle("Habitat Home Page")
  }

  ngOnInit(): void {
  }

  search() {
    this.propertyService.getProperties(this.filter, 1).subscribe({
      next: res => {
        this.propertyService.response = res;
        this.propertyService.filter_body = this.filter;
        this.router.navigate(['properties']);
      },
      error: error => {
        this.router.navigate(['error']);
      }
    }
    )
  }

}
