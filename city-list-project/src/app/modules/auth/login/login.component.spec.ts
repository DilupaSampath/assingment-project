import { ComponentFixture, TestBed } from '@angular/core/testing';
import {LoginComponent} from "./login.component";
import {Title} from "@angular/platform-browser";
import {NotificationService} from "../../../core/services/notification.service";
import {AuthenticationService} from "../services/auth.service";
import {GlobalFacadeService} from "../../../core/services/global-facade.service";
import {MockComponents, MockModule} from "ng-mocks";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {AuthRoutingModule} from "../auth-routing.module";
import {RouterTestingModule} from "@angular/router/testing";
import {RegisterComponent} from "../register/register.component";
import {AuthNavBarComponent} from "../auth-nav-bar/auth-nav-bar.component";
import {Router, Routes} from "@angular/router";
import {SharedEventDataHandlerService} from "../../../shared/services/shared-event-data-handler.service";
import {of} from "rxjs";


describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let mockGlobalFacadeService: any = jest.genMockFromModule( '../../../core/services/global-facade.service');
    let mockNotificationService = jest.genMockFromModule( '../../../core/services/notification.service');
    let mockTitleService = jest.genMockFromModule<Title>( '@angular/platform-browser');
    let mockRouter = jest.genMockFromModule( '@angular/router');
    let mockAuthenticationService = jest.genMockFromModule<AuthenticationService>( '../services/auth.service');
    let mockSharedEventDataHandlerService = jest.genMockFromModule<SharedEventDataHandlerService>( '../../../shared/services/shared-event-data-handler.service');

    beforeEach(async () => {
        mockTitleService.setTitle = jest.fn();
        mockAuthenticationService.logout = jest.fn();
        jest.spyOn(RegisterComponent.prototype as any,
            'createForm');
        mockSharedEventDataHandlerService.globalEventHandler$ = of(true );
        mockGlobalFacadeService.sharedEventDataHandlerService = mockSharedEventDataHandlerService;

        const routes: Routes = [
            {path: 'auth-user/login', component: LoginComponent}
        ];
        await TestBed.configureTestingModule({
            imports: [MockModule(CommonModule),MockModule(SharedModule),MockModule(AuthRoutingModule),
                RouterTestingModule.withRoutes(routes)],
            declarations: [
                LoginComponent,
                ...MockComponents(RegisterComponent, AuthNavBarComponent),
            ],
            providers: [ { provide: GlobalFacadeService, useValue: mockGlobalFacadeService },
                { provide: Router, useValue: mockRouter },
                { provide: NotificationService, useValue: mockNotificationService },
                { provide: Title, useValue: mockTitleService },
                { provide: AuthenticationService, useValue: mockAuthenticationService }],
        });
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    });


    it('should load with correct titles', () => {
        expect(component).toBeDefined();
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const title = compiled.querySelector('mat-toolbar');
        const submitButton = compiled.querySelector('#login');


        expect(title.textContent).toContain('City List Project Login');
        expect(submitButton.textContent).toContain('Login');
    });
});
