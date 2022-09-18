import {ComponentFixture, TestBed} from "@angular/core/testing";
import {LoginComponent} from "../../auth/login/login.component";
import {Routes} from "@angular/router";
import {MockComponents, MockModule} from "ng-mocks";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {CityListComponent} from "../city-list/city-list.component";
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CityService} from "../services/city.service";
import {NotificationService} from "../../../core/services/notification.service";
import {GlobalFacadeService} from "../../../core/services/global-facade.service";
import {CityItemComponent} from "../city-item/city-item.component";
import {Title} from "@angular/platform-browser";
import {NGXLogger} from "ngx-logger";


describe('CityListComponent', () => {
  let component: CityListComponent;
  let fixture: ComponentFixture<CityListComponent>;
  let mockMatDialog: any = jest.genMockFromModule<MatDialog>( '@angular/material/dialog');
  let mockCityService = jest.genMockFromModule<CityService>( '../services/city.service');
  let mockNotificationService = jest.genMockFromModule<NotificationService>( '../../../core/services/notification.service');
  let mockGlobalFacadeService = jest.genMockFromModule<GlobalFacadeService>( '../../../core/services/global-facade.service');
  let mockMatDialogRef = jest.genMockFromModule<MatDialogRef<any>>( '@angular/material/dialog');
  let mockTitleService = jest.genMockFromModule<Title>( '@angular/platform-browser');
  let mockNGXLogger = jest.genMockFromModule<NGXLogger>( 'ngx-logger');
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    const routes: Routes = [
      {path: 'auth-user/login', component: LoginComponent}
    ];
    await TestBed.configureTestingModule({
      imports: [MockModule(CommonModule),MockModule(SharedModule),
        RouterTestingModule.withRoutes(routes)],
      declarations: [
        CityListComponent,
        ...MockComponents(CityItemComponent),
      ],
      providers: [ { provide: FormBuilder, useValue: formBuilder },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: CityService, useValue: mockCityService },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: GlobalFacadeService, useValue: mockGlobalFacadeService },
        { provide: Title, useValue: mockTitleService },
        { provide: NGXLogger, useValue: mockNGXLogger }],
    });
    fixture = TestBed.createComponent(CityListComponent);
    component = fixture.componentInstance;
    mockTitleService.setTitle = jest.fn();
  });


  it('should load with correct titles', () => {
    component.generateTableColumDataModel = jest.fn();
    // component.lo = jest.fn();
    component['logger'] = mockNGXLogger;
    component['logger'].log = (x) => console.log(x);

    expect(component).toBeTruthy();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const paginationTable = compiled.querySelector('app-pagination-table');
    expect(paginationTable).toBeTruthy();
  });
});
