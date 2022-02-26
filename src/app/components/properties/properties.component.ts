import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { RequestBody } from 'src/app/models/request-body';
import { PropertyService } from 'src/app/services/property.service';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  properties: any;
  count: number;

  filter_body = new RequestBody();

  pagination_filter_body: RequestBody;

  pageEvent: PageEvent | undefined;
  datasource: null;
  pageIndex: number;
  pageSize: number;
  length: number;

  config: SwiperConfigInterface = {
    a11y: undefined,
    direction: 'horizontal',
    slidesPerView: 1,
    slideToClickedSlide: true,
    mousewheel: false,
    scrollbar: false,
    watchSlidesProgress: true,
    navigation: true,
    keyboard: true,
    pagination: false,
    centeredSlides: true,
    loop: true,
    roundLengths: true,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    spaceBetween: 0,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1
      }
    }
  };

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.addTags([
      { name: 'author', content: "Habitat company" },
      { name: 'keywords', content: "Property, Real Estate, Flat, House, Location, Price, Garage, Pool, Elevator" },
      { name: 'viewport', contetn: 'width=device-width, initial-scale=1' },
      { name: 'description', content: "All properties at one place. Filtering properties to your needs. Look at properties' price, location, size, number of bedrooms and other." }
    ])

    this.title.setTitle("Property Catalogue Page")
  }

  ngOnInit(): void {
    let page = 1
    if(localStorage.getItem('home_filter')){
      this.filter_body = JSON.parse(localStorage.getItem('home_filter')!)
      localStorage.clear()
    }
    else if(JSON.stringify(this.propertyService.filter_body) != JSON.stringify(new RequestBody()) && (typeof this.propertyService.filter_body != 'undefined')){
      this.filter_body = this.propertyService.filter_body
      page = this.propertyService.response.page;
    }else{
      this.filter_body = new RequestBody()
    }
    this.filter_body =  localStorage.getItem('home_filter') ? JSON.parse(localStorage.getItem('home_filter')!) : new RequestBody();
    this.propertyService.getProperties(this.filter_body, page).subscribe({
      next: res => {
            this.propertyService.response = res
            this.properties = this.propertyService.response.data;
            this.count = this.propertyService.response.count;
            this.datasource = this.properties;
            this.pageIndex = this.propertyService.response.page;
            this.pageSize = this.propertyService.response.perPage;
            this.length = this.count;

            this.propertyService.filter_body = this.filter_body
          },
          error: error => {
            this.router.navigate(['error'])
          }
    })

    this.pagination_filter_body = JSON.parse(JSON.stringify(this.filter_body)); // deep copy   
  }

  search() {
    this.propertyService.getProperties(this.filter_body, 1).subscribe({
      next: res => {
        this.propertyService.response = res;
        this.properties = this.propertyService.response.data;
        this.count = this.propertyService.response.count;
        this.datasource = this.properties;
        this.pageIndex = 1;
        this.pageSize = this.propertyService.response.perPage;
        this.length = this.count;

        this.pagination_filter_body = JSON.parse(JSON.stringify(this.filter_body)); // deep copy
        this.propertyService.filter_body = this.filter_body
      },
      error: error => {
        this.router.navigate(['error']);
      }
    })
  }

  public getServerData(event: PageEvent) {
    this.propertyService.getProperties(this.pagination_filter_body, event.pageIndex + 1).subscribe({
      next: res => {
        this.propertyService.response = res;
        this.properties = this.propertyService.response.data;
        this.count = this.propertyService.response.count;
        this.datasource = this.properties;
        this.pageIndex = this.propertyService.response.page;
        this.pageSize = this.propertyService.response.perPage;
        this.length = this.count;
      },
      error: error => {
        this.router.navigate(['error']);
      }
    })
    return event;
  }

  public sortSearch(event: any) {
    this.pagination_filter_body.sort = event.target.value;
    this.propertyService.getProperties(this.pagination_filter_body, 1).subscribe({
      next: res => {
        this.propertyService.response = res;
        this.properties = this.propertyService.response.data;
        this.pageIndex = 1;
      },
      error: error => {
        this.router.navigate(['error']);
      }
    })
  }

  public onIndexChange(index: number) {
    //console.log('Swiper index: ', index);
  }

  public checkDetails(property: any) {
    this.router.navigate(['./details', property.public_id]);
  }
}
