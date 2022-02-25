import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  error_message : String;
  constructor(
    private propertyService : PropertyService,
    private meta: Meta,
    private title: Title
  ) { 
    this.meta.addTags([
      { name: 'author', content: "Habitat company" }, 
      { name: 'keywords', content: "Property, Real Estate, Flat, House, Location, Price, Garage, Pool, Elevator" },
      { name: 'viewport', contetn: 'width=device-width, initial-scale=1'},
      { name: 'description', content: "Error page. Property youre looking for is not found." }
    ])

    this.title.setTitle("Property Catalogue Page")
  }

  ngOnInit(): void {
    this.error_message = this.propertyService.errorMessage;
  }

}
