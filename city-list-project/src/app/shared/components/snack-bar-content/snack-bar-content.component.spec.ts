import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../core/services/notification.service";
import {GlobalFacadeService} from "../../../core/services/global-facade.service";
import {SharedEventDataHandlerService} from "../../services/shared-event-data-handler.service";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../../../modules/auth/login/login.component";
import {of} from "rxjs";
import {MockComponents, MockDirectives, MockModule, MockPipes} from "ng-mocks";
import {RouterTestingModule} from "@angular/router/testing";
import {CustomMaterialModule} from "../../../custom-material/custom-material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {LayoutComponent} from "../../layout/layout.component";
import {UserRoleDirective} from "../../directives/user-role.directive";
import {TextTitleCasePipe} from "../../pipes/title-case.pipe";
import {HandleMissingImageDirective} from "../../directives/handle-missing-image.directive";
import {SnackBarContentComponent} from "./snack-bar-content.component";
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

describe('SnackBarContentComponent', () => {
  let component: SnackBarContentComponent;
  let fixture: ComponentFixture<SnackBarContentComponent>;
  let mockMatDialog: any = jest.genMockFromModule<MatDialog>( '@angular/material/dialog');
  let mockNotificationService = jest.genMockFromModule<NotificationService>( '../../../core/services/notification.service');
  let mockGlobalFacadeService = jest.genMockFromModule<GlobalFacadeService>( '../../../core/services/global-facade.service');
  let mockMatDialogRef = jest.genMockFromModule<MatDialogRef<any>>( '@angular/material/dialog');
  let mockMatSnackBarRef = jest.genMockFromModule<MatSnackBarRef<any>>( '@angular/material/snack-bar');
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
        SnackBarContentComponent,
        ...MockDirectives(UserRoleDirective, HandleMissingImageDirective),
        ...MockPipes(TextTitleCasePipe),
        ...MockComponents(ConfirmDialogComponent,LayoutComponent)
      ],
      providers: [ { provide: FormBuilder, useValue: formBuilder },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: MAT_SNACK_BAR_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MatSnackBarRef, useValue: mockMatSnackBarRef },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: GlobalFacadeService, useValue: mockGlobalFacadeService }],
    });
    fixture = TestBed.createComponent(SnackBarContentComponent);
    component = fixture.componentInstance;
  });


  it('should load with correct components', () => {
    expect(component).toBeTruthy();
    component.data = [];
    fixture.detectChanges();
    });
});
