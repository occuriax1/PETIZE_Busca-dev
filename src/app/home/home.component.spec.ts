import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';

// Cria um mock para o Router
class RouterStub {
  navigate(params: any) {}
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        { provide: Router, useClass: RouterStub }  // Substitui o Router real pelo nosso mock
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);  // Injeta o mock do Router para poder espionar suas chamadas
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to profile page when username is set and searchUser is called', () => {
    const routerSpy = spyOn(router, 'navigate');  // Espiona o método navigate do router
    component.username = 'testuser';
    component.searchUser();
    expect(routerSpy).toHaveBeenCalledWith(['/profile', 'testuser']);  // Verifica se o navigate foi chamado com os parâmetros corretos
  });

  it('should not navigate if username is empty', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.username = '';  // Deixa o username vazio
    component.searchUser();
    expect(routerSpy).not.toHaveBeenCalled();  // Verifica que navigate não foi chamado
  });
});
