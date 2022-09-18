import {CityItemComponent} from "./city-item.component";
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


describe('CityItemComponent', () => {
  let component: CityItemComponent;
  let fixture: ComponentFixture<CityItemComponent>;
  let mockMatDialog: any = jest.genMockFromModule<MatDialog>( '@angular/material/dialog');
  let mockCityService = jest.genMockFromModule<CityService>( '../services/city.service');
  let mockNotificationService = jest.genMockFromModule<NotificationService>( '../../../core/services/notification.service');
  let mockGlobalFacadeService = jest.genMockFromModule<GlobalFacadeService>( '../../../core/services/global-facade.service');
  let mockMatDialogRef = jest.genMockFromModule<MatDialogRef<any>>( '@angular/material/dialog');
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    const routes: Routes = [
      {path: 'auth-user/login', component: LoginComponent}
    ];
    await TestBed.configureTestingModule({
      imports: [MockModule(CommonModule),MockModule(SharedModule),
        RouterTestingModule.withRoutes(routes)],
      declarations: [
        CityItemComponent,
        ...MockComponents(CityListComponent),
      ],
      providers: [ { provide: FormBuilder, useValue: formBuilder },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: CityService, useValue: mockCityService },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: GlobalFacadeService, useValue: mockGlobalFacadeService }],
    });
    fixture = TestBed.createComponent(CityItemComponent);
    component = fixture.componentInstance;

    component.cityForm = formBuilder.group({
      name: null,
      photo: null
    });
    component.cityForm.setValue({
      "name": "colombo",
      "photo": "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQb17zzW4kAQrnsGvZPpji_cAXE7RXbcWFwzV-Gvrl-bwjJkLC5956xeFphq4hTJIPV"
    });
  });


  it('should load with correct titles', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const closeButton = compiled.querySelector('mat-icon');
    expect(closeButton.textContent).toContain('close');
    const editCityTitleViewMode = compiled.querySelector('h2');
    expect(editCityTitleViewMode).toEqual(null);
    component.isEditMode = true;
    fixture.detectChanges();
    const editCityTitle = compiled.querySelector('h2');
    expect(editCityTitle.textContent).toContain('Edit city');
  });
});
