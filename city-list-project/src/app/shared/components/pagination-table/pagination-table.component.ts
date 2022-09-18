import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomDatasourceModel } from 'src/app/shared/models/custom-data-source.model';
import { ICommonPagination } from 'src/app/shared/interfaces/common-pagination.interface';
import {debounceTime, distinctUntilChanged, fromEvent, tap} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumDataModel } from '../../models/table-colum-data.model';
import { TableDataTypeEnum } from '../../enums/table-data-type.enum';
import { UserRoleEnum } from '../../enums/user-role.enum';
import { GlobalFacadeService } from 'src/app/core/services/global-facade.service';
import {fadeOut} from "../../../core/animations/common.animation";

// this is common component for use table with pagnation. we can handle pagination type
// isServerSidePagination input; server side or client side
@Component({
  selector: 'app-pagination-table',
  templateUrl: './pagination-table.component.html',
  styleUrls: ['./pagination-table.component.css'],
  animations: [fadeOut],
})
export class PaginationTableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild('input') input!: ElementRef;
  sort: MatSort = new MatSort;

  @Input() displayedColumns: string[] = ['ID', 'NAME', 'IMAGE', 'ACTION'];
  @Input() tableColumDataModel: TableColumDataModel[] = [];
  @Input() commonPaginationModel!: ICommonPagination;
  @Input() dataSource!: CustomDatasourceModel;
  @Input() dataSourceClientSide!: MatTableDataSource<any>;
  @Input() tableTitle: string = '';
  @Input() isServerSidePagination: boolean = true;
  @Input() isActiveFilter: boolean = false;
  @Input() filterInputPlaceHolder: string = 'Search here';

  @Output() viewEvent = new EventEmitter<string>();
  @Output() editEvent = new EventEmitter<string>();

  TableDataTypeEnum = TableDataTypeEnum;
  UserRoleEnum =  UserRoleEnum;


  constructor(private globalFacadeService: GlobalFacadeService) {
    globalFacadeService.sharedEventDataHandlerService.globalEventHandler$.subscribe((result: any)=>{
      if(result?.EVENT === 'UPDATE_PAGINATION_CITY'){
        this.loadData();
        }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.tableColumDataModel);
  }

  ngOnInit(): void {
    if(this.isServerSidePagination){
      (this.dataSource as CustomDatasourceModel).loadData(0);
    }
  }
  onImageLoad(evt: any, element: any){
    // console.log(data);
element.imageLoadFail = true;
    const width = evt.target.naturalWidth;
          const height = evt.target.naturalHeight;
          const portrait = height > width ? true : false;
          console.log(width, height, 'portrait: ', portrait);
  }


  ngAfterViewInit() {
    if(this.isServerSidePagination){

      (this.dataSource as CustomDatasourceModel).counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();

    if(this?.input?.nativeElement){
      fromEvent(this.input.nativeElement,'keyup')
          .pipe(
              debounceTime(150),
              distinctUntilChanged(),
              tap(() => {
                this.paginator.pageIndex = 0;
                this.loadData();
              })
          )
          .subscribe();
    }

    this.paginator.page
      .pipe(
        tap(() => this.loadData())
      )
      .subscribe();
    }
  }


  loadData() {
    if(this.isServerSidePagination){
      (this.dataSource as CustomDatasourceModel).loadData(this.paginator.pageIndex, this.paginator.pageSize, this.input.nativeElement.value);
    }
  }

  triggerViewEvent(eventData: any) {
    this.viewEvent.emit(eventData);
  }

  triggerEditEvent(eventData: any, type: UserRoleEnum) {
    eventData.type = type;
    this.editEvent.emit(eventData);
  }
}
