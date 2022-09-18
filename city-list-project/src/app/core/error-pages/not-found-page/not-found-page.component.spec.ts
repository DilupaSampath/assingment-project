import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Routes} from "@angular/router";
import {MockComponents, MockModule} from "ng-mocks";
import {CommonModule} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";
import {NotFoundPageComponent} from "./not-found-page.component";
import {LoginComponent} from "../../../modules/auth/login/login.component";
import {HttpClientModule} from "@angular/common/http";
import {UnauthorizePageComponent} from "../unauthorize-page/unauthorize-page.component";
import {AuthGuard} from "../../guards/auth.guard";
import {MediaMatcher} from "@angular/cdk/layout";


describe('NotFoundPageComponent', () => {
  let component: NotFoundPageComponent;
  let fixture: ComponentFixture<NotFoundPageComponent>;
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
        NotFoundPageComponent,
        ...MockComponents(UnauthorizePageComponent),
      ],
      providers: [ { provide: AuthGuard, useValue: mockAuthGuard },
        { provide: MediaMatcher, useValue: mockMediaMatcher }],
    });
    fixture = TestBed.createComponent(NotFoundPageComponent);
    component = fixture.componentInstance;
  });


  it('should load with correct titles', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const notFoundTitle = compiled.querySelector('h2');
    const notFoundMessage = compiled.querySelector('p');

    expect(notFoundTitle.textContent).toContain('404 - Page not found');
    expect(notFoundMessage.textContent).toContain('The page you are looking for might have been removed had its name changed or is temporarily unavailable.');
  });
});
