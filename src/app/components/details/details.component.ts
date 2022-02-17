import { Component, OnInit } from '@angular/core';
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
    slidesPerView: 3,
    slideToClickedSlide: true,
    mousewheel: true,
    scrollbar: false,
    watchSlidesProgress: true,
    navigation: true,
    keyboard: true,
    pagination: false,
    centeredSlides: true,
    loop: true,
    roundLengths: true,
    slidesOffsetBefore: 100,
    slidesOffsetAfter: 100,
    spaceBetween: 50,
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1
        }
    }
  };
  
  property : any;

  constructor(
    private propertyService : PropertyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if((typeof this.propertyService.response) == "undefined")
      this.propertyService.responseObservable$.subscribe(() => {
        this.property = this.propertyService.response.data.filter((el: any) => {
          if(el._id ==  this.route.snapshot.paramMap.get('id')) return el;
        })[0];
      })
    else{
      this.property = this.propertyService.response.data.filter((el: any) => {
        if(el._id ==  this.route.snapshot.paramMap.get('id')) return el;
      })[0];
    }      
  }

  public onIndexChange(index: number) {
    //console.log('Swiper index: ', index);
  }

  public share(medium : number){
    /*
      1 - whatsapp
      2 - viber
      3 - telegram
    */

      switch(medium){
        case 1:
          this.router.navigate([]).then(result => {  window.open(`https://api.whatsapp.com/send?text=Check out this property: ${window.location.origin+this.router.url}`, '_blank'); });
        break;
        case 2:
          this.router.navigate([]).then(result => {  window.open(`viber://forward?text=Check out this property: ${window.location.origin+this.router.url}`, '_blank'); });
        break;
        case 3:
          this.router.navigate([]).then(result => {  window.open(`https://t.me/share/url?url=https://habitat.rs&text=Check out this property: ${window.location.origin+this.router.url}`, '_blank'); });
        break;
      }
  }
}
