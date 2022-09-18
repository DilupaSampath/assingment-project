import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Router, Routes} from "@angular/router";
import {MockComponents, MockModule} from "ng-mocks";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {GlobalFacadeService} from "../../../core/services/global-facade.service";
import {NotificationService} from "../../../core/services/notification.service";
import {Title} from "@angular/platform-browser";
import {SharedEventDataHandlerService} from "../../../shared/services/shared-event-data-handler.service";
import {ProfileDetailsComponent} from "./profile-details.component";
import {AuthenticationService} from "../../auth/services/auth.service";
import {LoginComponent} from "../../auth/login/login.component";
import {AuthRoutingModule} from "../../auth/auth-routing.module";
import {AccountPageComponent} from "../account-page/account-page.component";
import {UpdateRoleComponent} from "../update-role/update-role.component";

describe('ProfileDetailsComponent', () => {
    let component: ProfileDetailsComponent;
    let fixture: ComponentFixture<ProfileDetailsComponent>;
    let mockGlobalFacadeService: any = jest.genMockFromModule( '../../../core/services/global-facade.service');
    let mockNotificationService = jest.genMockFromModule( '../../../core/services/notification.service');
    let mockTitleService = jest.genMockFromModule<Title>( '@angular/platform-browser');
    let mockRouter = jest.genMockFromModule( '@angular/router');
    let mockAuthenticationService = jest.genMockFromModule<AuthenticationService>( '../../auth/services/auth.service');
    let mockSharedEventDataHandlerService = jest.genMockFromModule<SharedEventDataHandlerService>( '../../../shared/services/shared-event-data-handler.service');
    beforeEach(async () => {
        const routes: Routes = [
            {path: 'auth-user/login', component: LoginComponent}
        ];
        mockTitleService.setTitle = jest.fn();
        mockAuthenticationService.logout = jest.fn();
        await TestBed.configureTestingModule({
            imports: [MockModule(CommonModule),MockModule(SharedModule),MockModule(AuthRoutingModule),
                RouterTestingModule.withRoutes(routes)],
            declarations: [
                ProfileDetailsComponent,
                ...MockComponents(AccountPageComponent, UpdateRoleComponent),
            ],
            providers: [ { provide: GlobalFacadeService, useValue: mockGlobalFacadeService },
                { provide: NotificationService, useValue: mockNotificationService },
                { provide: Title, useValue: mockTitleService },
                { provide: AuthenticationService, useValue: mockAuthenticationService }],
        });
        fixture = TestBed.createComponent(ProfileDetailsComponent);
        component = fixture.componentInstance;
    });


    it('should load', () => {
        expect(component).toBeTruthy();
    });
});
