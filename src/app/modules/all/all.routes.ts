import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AllComponent } from 'app/modules/all/all.component';
import { AllService } from 'app/modules/all/all.service';

export default [
    {
        path     : '',
        component: AllComponent,
        resolve  : {
            data: () => inject(AllService).getData(),
        },
    },
] as Routes;
