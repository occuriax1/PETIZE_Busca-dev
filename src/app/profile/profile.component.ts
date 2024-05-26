import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userSubscription: Subscription | null = null; // Inicialização como nulo
  repoSubscription: Subscription | null = null; // Inicialização como nulo
  user: any = null; // Garante que user pode ser nulo
  repositories: any[] = [];
  username: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.body.classList.add('profile-page');
    this.userSubscription = this.userService.getUser().subscribe(user => {
      this.user = user;
    });

    this.repoSubscription = this.userService.getRepositories().subscribe(repos => {
      this.repositories = repos;
      this.totalPages = Math.ceil(this.repositories.length / this.itemsPerPage); // Corrigido para usar itemsPerPage
    });

    this.route.params.subscribe(params => {
      const username = params['username'];
      if (username) {
        this.userService.fetchUserData(username);
      }
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('profile-page');
    this.userSubscription?.unsubscribe(); // Uso seguro de optional chaining
    this.repoSubscription?.unsubscribe(); // Uso seguro de optional chaining
  }

  searchUser(): void {
    if (this.username.trim()) {
      const navigation = {
        queryParams: { reload: new Date().getTime() }  // Parâmetro de consulta fictício para forçar o recarregamento
      };
      this.router.navigate(['/profile', this.username], navigation);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  contactUser(): void {
    Swal.fire({
      title: 'Contato',
      text: 'Seu contato foi enviado com sucesso!',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      console.log('Contato enviado para:', this.user ? this.user.name : "unknown", 'Apenas um feedback visual para ficar mais verídico');
    });
  }
  paginatedRepos(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.repositories.slice(startIndex, endIndex);
  }
  getDaysAgo(dateString: string): number {
    const date = new Date(dateString);
    const today = new Date();
    const timeDiff = today.getTime() - date.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  }
}

