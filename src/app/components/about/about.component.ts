import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    private meta: Meta,
    private title: Title
  ) { 
    this.meta.addTags([
      { name: 'author', content: "Habitat company" }, 
      { name: 'keywords', content: "Property, Real Estate, Flat, House, Location, Price, Garage, Pool, Elevator, Security, Building" },
      { name: 'viewport', contetn: 'width=device-width, initial-scale=1'},
      { name: 'description', content: "Habitat Real Estate was founded twelve years ago, with the objective of performing professional brokerage services in the city of Belgrade. From the beginning, we have set ourselves to create a real estate company with the character and quality that would successfully meet the needs of our international clients, while also meeting the long-term financial objectives of our investors." }
    ])

    this.title.setTitle("About Us Page")
  }

  ngOnInit(): void {
  }

}
