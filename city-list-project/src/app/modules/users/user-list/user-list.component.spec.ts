import {ComponentFixture, TestBed} from "@angular/core/testing";
import {LoginComponent} from "../../auth/login/login.component";
import {Routes} from "@angular/router";
import {MockModule} from "ng-mocks";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../core/services/notification.service";
import {GlobalFacadeService} from "../../../core/services/global-facade.service";
import {Title} from "@angular/platform-browser";
import {NGXLogger} from "ngx-logger";
import {of} from "rxjs";
import {UserListComponent} from "./user-list.component";
import {UserService} from "../services/user.service";
import {SharedEventDataHandlerService} from "../../../shared/services/shared-event-data-handler.service";
import {HttpClientModule} from "@angular/common/http";


describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockMatDialog: any = jest.genMockFromModule<MatDialog>( '@angular/material/dialog');
  let mockUserService = jest.genMockFromModule<UserService>( '../services/user.service');
  let mockNotificationService = jest.genMockFromModule<NotificationService>( '../../../core/services/notification.service');
  let mockGlobalFacadeService = jest.genMockFromModule<GlobalFacadeService>( '../../../core/services/global-facade.service');
  let mockMatDialogRef = jest.genMockFromModule<MatDialogRef<any>>( '@angular/material/dialog');
  let mockTitleService = jest.genMockFromModule<Title>( '@angular/platform-browser');
  let mockNGXLogger = jest.genMockFromModule<NGXLogger>( 'ngx-logger');
  let mockSharedEventDataHandlerService = jest.genMockFromModule<SharedEventDataHandlerService>( '../../../shared/services/shared-event-data-handler.service');
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    const routes: Routes = [
      {path: 'auth-user/login', component: LoginComponent}
    ];
    mockUserService.getAll = jest.fn();
    jest.spyOn(mockUserService, 'getAll').mockImplementation(
        () => of([] )
    );

    mockSharedEventDataHandlerService.globalEventHandler$ = of(true );
    (mockGlobalFacadeService as any).sharedEventDataHandlerService = mockSharedEventDataHandlerService;
    await TestBed.configureTestingModule({
      imports: [MockModule(CommonModule),MockModule(SharedModule),MockModule(HttpClientModule),
        RouterTestingModule.withRoutes(routes)],
      declarations: [
        UserListComponent
      ],
      providers: [ { provide: FormBuilder, useValue: formBuilder },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: UserService, useValue: mockUserService },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: GlobalFacadeService, useValue: mockGlobalFacadeService },
        { provide: Title, useValue: mockTitleService },
        { provide: NGXLogger, useValue: mockNGXLogger },
        { provide: 'LOCALSTORAGE', useValue: window.localStorage }],
    });
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    mockTitleService.setTitle = jest.fn();
  });


  it('should load with correct components', () => {
    component.generateTableColumDataModel = jest.fn();
    component['logger'] = mockNGXLogger;
    component['logger'].log = (x) => console.log(x);

    expect(component).toBeTruthy();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let progressBar = compiled.querySelector('mat-progress-bar');
    const paginationTableComponent = compiled.querySelector('app-pagination-table');
    expect(progressBar).toBeNull();
    expect(paginationTableComponent).toBeTruthy();
    component.loading = true;
    fixture.detectChanges();
    progressBar = compiled.querySelector('mat-progress-bar');
    expect(progressBar).toBeTruthy();
  });
});
