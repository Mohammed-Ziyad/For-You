import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from 'app/modules/home/home.component';
import { HomeService } from 'app/modules/home/home.service';
import { BathComponent } from './bath/bath.component';
import { KitchenDiningComponent } from './kitchen-dining/kitchen-dining.component';

export default [
    {
        path     : '',
        component: HomeComponent,
        resolve  : {
            data: () => inject(HomeService).getData(),
        },
    },
    // Kitchen & Dining
    {
        path:'kitchen-dining',
        component:KitchenDiningComponent

    },
    {
        path:'bath',

        component:BathComponent
    }
] as Routes;
