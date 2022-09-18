import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Title} from "@angular/platform-browser";
import {AuthenticationService} from "../../auth/services/auth.service";
import {SharedEventDataHandlerService} from "../../../shared/services/shared-event-data-handler.service";
import {Routes} from "@angular/router";
import {LoginComponent} from "../../auth/login/login.component";
import {MockComponents, MockModule} from "ng-mocks";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {GlobalFacadeService} from "../../../core/services/global-facade.service";
import {NotificationService} from "../../../core/services/notification.service";
import {AccountRoutingModule} from "../account-routing.module";
import {AccountPageComponent} from "./account-page.component";
import {UpdateRoleComponent} from "../update-role/update-role.component";
import {ProfileDetailsComponent} from "../profile-details/profile-details.component";


describe('AccountPageComponent', () => {
    let component: AccountPageComponent;
    let fixture: ComponentFixture<AccountPageComponent>;
    let mockGlobalFacadeService: any = jest.genMockFromModule( '../../../core/services/global-facade.service');
    let mockNotificationService = jest.genMockFromModule( '../../../core/services/notification.service');
    let mockTitleService = jest.genMockFromModule<Title>( '@angular/platform-browser');
    let mockAuthenticationService = jest.genMockFromModule<AuthenticationService>( '../../auth/services/auth.service');
    beforeEach(async () => {
        const routes: Routes = [
            {path: 'auth-user/login', component: LoginComponent}
        ];
        mockTitleService.setTitle = jest.fn();
        await TestBed.configureTestingModule({
            imports: [MockModule(CommonModule),MockModule(SharedModule),MockModule(AccountRoutingModule),
                RouterTestingModule.withRoutes(routes)],
            declarations: [
                AccountPageComponent,
                ...MockComponents(UpdateRoleComponent, ProfileDetailsComponent),
            ],
            providers: [ { provide: GlobalFacadeService, useValue: mockGlobalFacadeService },
                { provide: NotificationService, useValue: mockNotificationService },
                { provide: Title, useValue: mockTitleService },
                { provide: AuthenticationService, useValue: mockAuthenticationService }],
        });
        fixture = TestBed.createComponent(AccountPageComponent);
        component = fixture.componentInstance;
    });


    it('should load with correct titles', () => {
        expect(component).toBeTruthy();
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const loginRouteButton = compiled.querySelector('h2');

        expect(loginRouteButton.textContent).toContain('My Profile (Features not implemented yet)');
    });
});
