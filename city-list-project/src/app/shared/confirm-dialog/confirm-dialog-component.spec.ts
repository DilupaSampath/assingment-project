import {ConfirmDialogComponent} from "./confirm-dialog.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../core/services/notification.service";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {GlobalFacadeService} from "../../core/services/global-facade.service";
import {SharedEventDataHandlerService} from "../services/shared-event-data-handler.service";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../../modules/auth/login/login.component";
import {of} from "rxjs";
import {MockComponents, MockDirectives, MockModule, MockPipes} from "ng-mocks";
import {CustomMaterialModule} from "../../custom-material/custom-material.module";
import {RouterTestingModule} from "@angular/router/testing";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SnackBarContentComponent} from "../components/snack-bar-content/snack-bar-content.component";
import {LayoutComponent} from "../layout/layout.component";
import {UserRoleDirective} from "../directives/user-role.directive";
import {HandleMissingImageDirective} from "../directives/handle-missing-image.directive";
import {TextTitleCasePipe} from "../pipes/title-case.pipe";

describe('ConfirmDialogComponent', () => {
    let component: ConfirmDialogComponent;
    let fixture: ComponentFixture<ConfirmDialogComponent>;
    let mockMatDialog: any = jest.genMockFromModule<MatDialog>( '@angular/material/dialog');
    let mockNotificationService = jest.genMockFromModule<NotificationService>( '../../core/services/notification.service');
    let mockGlobalFacadeService = jest.genMockFromModule<GlobalFacadeService>( '../../core/services/global-facade.service');
    let mockMatDialogRef = jest.genMockFromModule<MatDialogRef<any>>( '@angular/material/dialog');
    let mockSharedEventDataHandlerService = jest.genMockFromModule<SharedEventDataHandlerService>( '../services/shared-event-data-handler.service');
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
                ConfirmDialogComponent,
                ...MockDirectives(UserRoleDirective, HandleMissingImageDirective),
                ...MockPipes(TextTitleCasePipe),
                ...MockComponents(SnackBarContentComponent,LayoutComponent)
            ],
            providers: [ { provide: FormBuilder, useValue: formBuilder },
                { provide: MatDialog, useValue: mockMatDialog },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: mockMatDialogRef },
                { provide: NotificationService, useValue: mockNotificationService },
                { provide: GlobalFacadeService, useValue: mockGlobalFacadeService }],
        });
        fixture = TestBed.createComponent(ConfirmDialogComponent);
        component = fixture.componentInstance;
    });


    it('should load with correct components', () => {
        expect(component).toBeTruthy();
        component.title = 'Test title';
        fixture.detectChanges();

        const compiled = fixture.debugElement.nativeElement;
        let tableTitle = compiled.querySelector('#dialog-title');
        expect(tableTitle.textContent).toEqual('Test title');
    });
});
