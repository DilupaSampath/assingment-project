import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthNavBarComponent } from './auth-nav-bar.component';
import {Router, Routes} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {MockComponents, MockModule} from "ng-mocks";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {AuthRoutingModule} from "../auth-routing.module";
import {RouterTestingModule} from "@angular/router/testing";
import {RegisterComponent} from "../register/register.component";
import {GlobalFacadeService} from "../../../core/services/global-facade.service";
import {NotificationService} from "../../../core/services/notification.service";
import {Title} from "@angular/platform-browser";
import {AuthenticationService} from "../services/auth.service";
import {SharedEventDataHandlerService} from "../../../shared/services/shared-event-data-handler.service";

describe('AuthNavBarComponent', () => {
  let component: AuthNavBarComponent;
  let fixture: ComponentFixture<AuthNavBarComponent>;
  let mockGlobalFacadeService: any = jest.genMockFromModule( '../../../core/services/global-facade.service');
  let mockNotificationService = jest.genMockFromModule( '../../../core/services/notification.service');
  let mockTitleService = jest.genMockFromModule<Title>( '@angular/platform-browser');
  let mockRouter = jest.genMockFromModule( '@angular/router');
  let mockAuthenticationService = jest.genMockFromModule<AuthenticationService>( '../services/auth.service');
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
        AuthNavBarComponent,
        ...MockComponents(RegisterComponent, LoginComponent),
      ],
      providers: [ { provide: GlobalFacadeService, useValue: mockGlobalFacadeService },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: Title, useValue: mockTitleService },
        { provide: AuthenticationService, useValue: mockAuthenticationService }],
    });
    fixture = TestBed.createComponent(AuthNavBarComponent);
    component = fixture.componentInstance;
  });


  it('should load with correct titles', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const loginRouteButton = compiled.querySelector('#default-login');
    const registerRouteButton = compiled.querySelector('#default-register');

    expect(loginRouteButton.textContent).toContain('Login');
    expect(registerRouteButton.textContent).toContain('Register');
  });
});
