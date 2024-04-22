import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { HomeService } from 'app/modules/home/home.service';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector       : 'home',
    templateUrl    : './home.component.html',
    styleUrls      :['./home.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [TranslocoModule, MatIconModule, MatButtonModule, MatRippleModule, MatMenuModule, MatTabsModule, MatButtonToggleModule, NgApexchartsModule, NgFor, NgIf, MatTableModule, NgClass, CurrencyPipe],
})
export class HomeComponent implements OnInit, OnDestroy
{

    data: any;
    selectedhome: string = 'ACME Corp. Backend App';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    cartOpen:boolean= false;
    isOpen:boolean=false;
    nameRoute:string='';
    // private _router:Router
    /**
     * Constructor
     */
    constructor(
        private _homeService: HomeService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,

    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the data
        this._homeService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) =>
            {
                // Store the data
                this.data = data;

                // Prepare the chart data
            });
    }


    redirectToPage(pageName: string): void {
        switch (pageName) {
          case 'Bath':
            this.nameRoute = 'bath';
            break;
          case 'Kitchen & Dining':
            this.nameRoute = 'kitchen-dining';
            break;
          // يمكنك إضافة حالات إضافية للغرف الأخرى هنا
          default:
            // توجيه المستخدم إلى الصفحة الافتراضية في حالة عدم وجود تطابق
            window.location.href = '/';
            break;
        }

        console.log('name route ' ,  this.nameRoute)
        this._router.navigate(['./', this.nameRoute ], {
            relativeTo: this._activatedRoute,
        });
      }


    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }




}
