import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { CryptoComponent } from 'app/modules/women/women.component';
import { CryptoService } from 'app/modules/women/women.service';

export default [
    {
        path     : '',
        component: CryptoComponent,
        resolve  : {
            data: () => inject(CryptoService).getData(),
        },
    },
] as Routes;
