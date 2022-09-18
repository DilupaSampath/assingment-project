import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import {GlobalFacadeService} from "../../../core/services/global-facade.service";
import {Router, Routes} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {NotificationService} from "../../../core/services/notification.service";
import {AuthenticationService} from "../services/auth.service";
import {MockComponents, MockModule} from "ng-mocks";
import {LoginComponent} from "../login/login.component";
import {AuthNavBarComponent} from "../auth-nav-bar/auth-nav-bar.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {AuthRoutingModule} from "../auth-routing.module";
import {of} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {SharedEventDataHandlerService} from "../../../shared/services/shared-event-data-handler.service";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let fixtureLoginComponent: ComponentFixture<LoginComponent>;
  let mockGlobalFacadeService: any = jest.genMockFromModule( '../../../core/services/global-facade.service');
  let mockNotificationService = jest.genMockFromModule( '../../../core/services/notification.service');
  let mockTitleService = jest.genMockFromModule<Title>( '@angular/platform-browser');
  let mockRouter = jest.genMockFromModule( '@angular/router');
  let mockAuthenticationService = jest.genMockFromModule<AuthenticationService>( '../services/auth.service');
  const routes: Routes = [
    {path: 'auth-user/login', component: LoginComponent}
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockModule(CommonModule),MockModule(SharedModule),MockModule(AuthRoutingModule),
        RouterTestingModule.withRoutes(routes)],
      declarations: [
        RegisterComponent,
          ...MockComponents(LoginComponent, AuthNavBarComponent),
  ],
      providers: [ { provide: GlobalFacadeService, useValue: mockGlobalFacadeService },
        { provide: Router, useValue: mockRouter },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: Title, useValue: mockTitleService },
        { provide: AuthenticationService, useValue: mockAuthenticationService }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    const returnValueMap = new Map();
    returnValueMap.set('email', 'dilupa@test.com');
    returnValueMap.set('password', 'dilupatest');
    returnValueMap.set('username', 'dilupa@test.com');
    mockTitleService.setTitle = jest.fn();
    mockAuthenticationService.logout = jest.fn();
    jest.spyOn(RegisterComponent.prototype as any,
        'createForm');
    const formBuilder: FormBuilder = new FormBuilder();
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.registerForm = formBuilder.group({
      email: null,
      password: null,
      username: null
    });
    component.registerForm.setValue({
      "password": "testpass",
      "email": "dilupa@test.com",
      "username": "dilupa@test.com"
    });
    mockAuthenticationService.register = jest.fn();
    jest.spyOn(mockAuthenticationService, 'register').mockImplementation(
        (x) => of(true )
    );
    });

  it('should load with correct titles', () => {
    expect(component).toBeTruthy();
   // component.register();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const title = compiled.querySelector('mat-toolbar');
    const submitButton = compiled.querySelector('#register');

    expect(title.textContent).toContain('Create Account');
    expect(submitButton.textContent).toContain('Get Started');
  });
});
