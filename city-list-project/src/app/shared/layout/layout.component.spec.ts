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
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {AuthenticationService} from "../../modules/auth/services/auth.service";
import {HttpClientModule} from "@angular/common/http";

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;
    let mockMatDialog: any = jest.genMockFromModule<MatDialog>( '@angular/material/dialog');
    let mockNotificationService = jest.genMockFromModule<NotificationService>( '../../core/services/notification.service');
    let mockGlobalFacadeService = jest.genMockFromModule<GlobalFacadeService>( '../../core/services/global-facade.service');
    let mockMatDialogRef = jest.genMockFromModule<MatDialogRef<any>>( '@angular/material/dialog');
    let mockSharedEventDataHandlerService = jest.genMockFromModule<SharedEventDataHandlerService>( '../services/shared-event-data-handler.service');
    let mockAuthenticationService = jest.genMockFromModule<AuthenticationService>( '../../modules/auth/services/auth.service');
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async () => {
        const routes: Routes = [
            {path: 'auth-user/login', component: LoginComponent}
        ];

        mockSharedEventDataHandlerService.globalEventHandler$ = of(true );
        (mockGlobalFacadeService as any).sharedEventDataHandlerService = mockSharedEventDataHandlerService;
        mockAuthenticationService.getCurrentUser = jest.fn();
        const testUser: any = {
            id: 1,
            username: 'test user',
            email: 'test@test.com',
            roles: 'ADMIN',
            token: 'testToken123#4$ds'
        };
        jest.spyOn(mockAuthenticationService, 'getCurrentUser').mockImplementation(
            () => testUser);
        await TestBed.configureTestingModule({
            imports: [MockModule(RouterModule),MockModule(FormsModule),MockModule(CustomMaterialModule),
                RouterTestingModule.withRoutes(routes), MockModule(ReactiveFormsModule), MockModule(FlexLayoutModule), MockModule(HttpClientModule)],
            declarations: [
                LayoutComponent,
                ...MockDirectives(UserRoleDirective, HandleMissingImageDirective),
                ...MockPipes(TextTitleCasePipe),
                ...MockComponents(SnackBarContentComponent,ConfirmDialogComponent)
            ],
            providers: [ { provide: FormBuilder, useValue: formBuilder },
                { provide: MatDialog, useValue: mockMatDialog },
                { provide: MatDialogRef, useValue: mockMatDialogRef },
                { provide: NotificationService, useValue: mockNotificationService },
                { provide: GlobalFacadeService, useValue: mockGlobalFacadeService },
                { provide: 'LOCALSTORAGE', useValue: window.localStorage }],
        });
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
    });


    it('should load with correct components', () => {
        expect(component).toBeTruthy();
        fixture.detectChanges();

        const compiled = fixture.debugElement.nativeElement;
        let tableTitle = compiled.querySelector('h1');
        expect(tableTitle.textContent.trim()).toEqual('Citi List Project');
    });
});
