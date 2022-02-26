import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
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

  property: any;

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private title: Title
  ) { 
    this.meta.addTags([
      { name: 'author', content: "Habitat company" }, 
      { name: 'keywords', content: "Property, Real Estate, Flat, House, Location, Price, Garage, Pool, Elevator, Security, Building" },
      { name: 'viewport', contetn: 'width=device-width, initial-scale=1'},
      { name: 'description', content: "Everything you need to know about particular property. You get property pictures/images and other information such as price, size, rent/sale, yard, number of bedrooms/bathrooms, furnishment type, floor type, distribution type, parking, terrace, elevator, swimming pool, security." }
    ])

    this.title.setTitle("Property Details Page")
  }

  ngOnInit(): void {
    this.propertyService.getSingleProperty(this.route.snapshot.paramMap.get('id')!).subscribe({
      next: (res: any) => {
        this.property = res.property;
      },
      error: (error : any) => {
        this.propertyService.errorMessage = "The property you are looking for is not on the market currently."
        this.router.navigate(['error']);
      }
    })
  }

  public onIndexChange(index: number) {
    //console.log('Swiper index: ', index);
  }

  public share(medium: number) {
    /*
      1 - whatsapp
      2 - viber
      3 - telegram
    */

    switch (medium) {
      case 1:
        this.router.navigate([]).then(result => { window.open(`https://api.whatsapp.com/send?text=Check out this property: ${window.location.origin + this.router.url}`, '_blank'); });
        break;
      case 2:
        this.router.navigate([]).then(result => { window.open(`viber://forward?text=Check out this property: ${window.location.origin + this.router.url}`, '_blank'); });
        break;
      case 3:
        this.router.navigate([]).then(result => { window.open(`https://t.me/share/url?url=https://habitat.rs&text=Check out this property: ${window.location.origin + this.router.url}`, '_blank'); });
        break;
    }
  }
}
