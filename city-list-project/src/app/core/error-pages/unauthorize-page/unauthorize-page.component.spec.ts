import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Routes} from "@angular/router";
import {MockComponents, MockModule} from "ng-mocks";
import {CommonModule} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";
import {LoginComponent} from "../../../modules/auth/login/login.component";
import {HttpClientModule} from "@angular/common/http";
import {UnauthorizePageComponent} from "./unauthorize-page.component";
import {AuthGuard} from "../../guards/auth.guard";
import {MediaMatcher} from "@angular/cdk/layout";
import {NotFoundPageComponent} from "../not-found-page/not-found-page.component";


describe('UnauthorizePageComponent', () => {
  let component: UnauthorizePageComponent;
  let fixture: ComponentFixture<UnauthorizePageComponent>;
  let mockAuthGuard: any = jest.genMockFromModule<AuthGuard>( '../../guards/auth.guard');
  let mockMediaMatcher = jest.genMockFromModule<MediaMatcher>( '@angular/cdk/layout');

  beforeEach(async () => {
    const routes: Routes = [
      {path: 'auth-user/login', component: LoginComponent}
    ];
    await TestBed.configureTestingModule({
      imports: [MockModule(CommonModule),MockModule(HttpClientModule),
        RouterTestingModule.withRoutes(routes)],
      declarations: [
        UnauthorizePageComponent,
        ...MockComponents(NotFoundPageComponent),
      ],
      providers: [ { provide: AuthGuard, useValue: mockAuthGuard },
        { provide: MediaMatcher, useValue: mockMediaMatcher }],
    });
    fixture = TestBed.createComponent(UnauthorizePageComponent);
    component = fixture.componentInstance;
  });


  it('should load with correct titles', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const notFoundTitle = compiled.querySelector('h3');
    const notFoundMessage = compiled.querySelector('p');

    expect(notFoundTitle.textContent).toContain('OPpsss!!!!');
    expect(notFoundMessage.textContent).toContain('Sorry, your access is refused due to security reasons of our server and also our sensitive data.Please go back to the previous page to continue browsing.');
  });
});
