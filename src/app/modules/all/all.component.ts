import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AllService as AllService } from 'app/modules/all/all.service';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector       : 'all',
    templateUrl    : './all.component.html',
    styles: [`  .work-sans {
        font-family: 'Work Sans', sans-serif;
    }

    #menu-toggle:checked + #menu {
        display: block;
    }

    .hover\:grow {
        transition: all 0.3s;
        transform: scale(1);
    }

    .hover\:grow:hover {
        transform: scale(1.02);
    }

    .carousel-open:checked + .carousel-item {
        position: static;
        opacity: 100;
    }

    .carousel-item {
        -webkit-transition: opacity 0.6s ease-out;
        transition: opacity 0.6s ease-out;
    }

    #carousel-1:checked ~ .control-1,
    #carousel-2:checked ~ .control-2,
    #carousel-3:checked ~ .control-3 {
        display: block;
    }

    .carousel-indicators {
        list-style: none;
        margin: 0;
        padding: 0;
        position: absolute;
        // bottom: 2%;
        left: 0;
        right: 0;
        text-align: center;
        z-index: 10;
    }

    #carousel-1:checked ~ .control-1 ~ .carousel-indicators li:nth-child(1) .carousel-bullet,
    #carousel-2:checked ~ .control-2 ~ .carousel-indicators li:nth-child(2) .carousel-bullet,
    #carousel-3:checked ~ .control-3 ~ .carousel-indicators li:nth-child(3) .carousel-bullet {
        color: #000;
        /*Set to match the Tailwind colour you want the active one to be */
    }
    // @import '@/scss/variables.scss';

.home {
  text-align: center;
  min-height: 86vh;
  padding-bottom: 0px;

  &__img {
    padding-top: 20px;
    padding-bottom: 30px;
    width: 80%;
    height: 100%;
    margin: 0 auto;
  }
}

.homeJoin {
  padding-top: 50px;
  padding-bottom: 30px;
  display: grid;
  grid-column-gap: 20px;
  align-items: center;
  justify-content: center;
}

.homeJoin__title {
  color:  hsl(220, 13%, 13%);
  padding-bottom: 16px;
  text-transform: uppercase;
}

.homeJoin__para {
  color: hsl(219, 9%, 45%);
  font-size: 1.1em;
  padding-bottom: 20px;
}
.homeJoin__btn {
  background:  hsl(220, 13%, 13%);
  font-weight: bolder;
  border: none;
  color: white;
  padding: 12px 40px;
  margin: 0 auto;
  text-transform: uppercase;
  column-gap: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

@media screen and (max-width: 1100px) {
  .home {
    min-height: auto;

    &__img {
      width: 100%;
      padding-top: 40px;
    }
  }

  .homeJoin__title {
    font-size: 1.1em;
    width: 94%;
    margin: 0 auto;
  }

  .homeJoin__para {
    color: hsl(219, 9%, 45%);
    font-size: 1em;
  }
}

    `],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule, NgApexchartsModule, MatTableModule, MatSortModule, NgClass, MatProgressBarModule, CurrencyPipe, DatePipe],
})
export class AllComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild('recentTransactionsTable', {read: MatSort}) recentTransactionsTableMatSort: MatSort;

    data: any;
    accountBalanceOptions: ApexOptions;
    recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['transactionId', 'date', 'name', 'amount', 'status'];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(private _allService: AllService)
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
        this._allService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) =>
            {
                // Store the data
                this.data = data;

                // Store the table data
                this.recentTransactionsDataSource.data = data.recentTransactions;

                // Prepare the chart data
                this._prepareChartData();
            });
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        // Make the data source sortable
        this.recentTransactionsDataSource.sort = this.recentTransactionsTableMatSort;
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

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareChartData(): void
    {
        // Account balance
        this.accountBalanceOptions = {
            chart  : {
                animations: {
                    speed           : 400,
                    animateGradually: {
                        enabled: false,
                    },
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                width     : '100%',
                height    : '100%',
                type      : 'area',
                sparkline : {
                    enabled: true,
                },
            },
            colors : ['#A3BFFA', '#667EEA'],
            fill   : {
                colors : ['#CED9FB', '#AECDFD'],
                opacity: 0.5,
                type   : 'solid',
            },
            series : this.data.accountBalance.series,
            stroke : {
                curve: 'straight',
                width: 2,
            },
            tooltip: {
                followCursor: true,
                theme       : 'dark',
                x           : {
                    format: 'MMM dd, yyyy',
                },
                y           : {
                    formatter: (value): string => value + '%',
                },
            },
            xaxis  : {
                type: 'datetime',
            },
        };
    }
}
