import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiDependentRoutingModule } from './api-dependent-routing.module';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { PropertiesComponent } from 'src/app/components/properties/properties.component';
import { PropertyService } from 'src/app/services/property.service';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AgmCoreModule } from '@agm/core';
import { SwiperModule } from 'ngx-swiper-wrapper';

const routes: Routes = [
  {
    path: '', component: PropertiesComponent
  },
  { 
    path: 'details/:id', component: DetailsComponent
  }
];

@NgModule({
  declarations: [
    DetailsComponent,
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    ApiDependentRoutingModule,
    FormsModule,
    MatPaginatorModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyATykmHVGVUPt2_cWgV-sfihnadOj7IzaI'
    }),
    SwiperModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PropertyService
  ]
})
export class ApiDependentModule { }
