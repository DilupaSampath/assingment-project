import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationTableComponent } from './pagination-table.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../core/services/notification.service";
import {GlobalFacadeService} from "../../../core/services/global-facade.service";
import {Title} from "@angular/platform-browser";
import {NGXLogger} from "ngx-logger";
import {SharedEventDataHandlerService} from "../../services/shared-event-data-handler.service";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../../../modules/auth/login/login.component";
import {of} from "rxjs";
import {MockComponent, MockComponents, MockDirective, MockDirectives, MockModule, MockPipes} from "ng-mocks";
import {RouterTestingModule} from "@angular/router/testing";
import {CustomMaterialModule} from "../../../custom-material/custom-material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {LayoutComponent} from "../../layout/layout.component";
import {UserRoleDirective} from "../../directives/user-role.directive";
import {TextTitleCasePipe} from "../../pipes/title-case.pipe";
import {HandleMissingImageDirective} from "../../directives/handle-missing-image.directive";
import {CustomDatasourceModel} from "../../models/custom-data-source.model";
import {MatPaginator} from "@angular/material/paginator";
import {Component, ElementRef, OnChanges, OnInit} from "@angular/core";
import {fadeOut} from "../../../core/animations/common.animation";

describe('PaginationTableComponent', () => {
  let component: PaginationTableComponent;
  let fixture: ComponentFixture<PaginationTableComponent>;
  let customDatasourceModel = jest.mock<CustomDatasourceModel>('../../models/custom-data-source.model');
  let mockMatPaginator = jest.mock<MatPaginator>('@angular/material/paginator');
  let mockMatDialog: any = jest.genMockFromModule<MatDialog>( '@angular/material/dialog');
  let mockNotificationService = jest.genMockFromModule<NotificationService>( '../../../core/services/notification.service');
  let mockGlobalFacadeService = jest.genMockFromModule<GlobalFacadeService>( '../../../core/services/global-facade.service');
  let mockMatDialogRef = jest.genMockFromModule<MatDialogRef<any>>( '@angular/material/dialog');
  let mockTitleService = jest.genMockFromModule<Title>( '@angular/platform-browser');
  let mockSharedEventDataHandlerService = jest.genMockFromModule<SharedEventDataHandlerService>( '../../../shared/services/shared-event-data-handler.service');
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    const routes: Routes = [
      {path: 'auth-user/login', component: LoginComponent}
    ];

    mockSharedEventDataHandlerService.globalEventHandler$ = of(true );
    (mockGlobalFacadeService as any).sharedEventDataHandlerService = mockSharedEventDataHandlerService;

    await TestBed.configureTestingModule({
      imports: [MockModule(RouterModule),MockModule(FormsModule),MockModule(CustomMaterialModule),
        RouterTestingModule.withRoutes(routes), MockModule(ReactiveFormsModule), MockModule(FlexLayoutModule),],
      declarations: [
        PaginationTableComponent,
          ...MockDirectives(UserRoleDirective, HandleMissingImageDirective),
          ...MockPipes(TextTitleCasePipe),
          ...MockComponents(ConfirmDialogComponent,LayoutComponent)
      ],
      providers: [ { provide: FormBuilder, useValue: formBuilder },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: GlobalFacadeService, useValue: mockGlobalFacadeService }],
    });
    fixture = TestBed.createComponent(PaginationTableComponent);
    component = fixture.componentInstance;
    mockTitleService.setTitle = jest.fn();
    component.dataSource = (customDatasourceModel as any);
    component.dataSource.loadData = jest.fn();
    component.dataSource.counter$ = of(0);
    component.paginator = (mockMatPaginator as any);
    component.paginator.page = of(0);

  });


  it('should load with correct components', () => {
    const mockChildComponent: any = {
      nativeElement: jest.fn()
    }

    component.input = new ElementRef<any>(MockComponent(LoginComponent));
    // component.input.nativeElement = new Event("");

    expect(component).toBeTruthy();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    component.tableTitle = 'Test title';
    fixture.detectChanges();
    let tableTitle = compiled.querySelector('h2');
    expect(tableTitle.textContent).toEqual('Test title');
  });
});