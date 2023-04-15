import {
  Component,
  OnInit,
  HostListener,
  OnDestroy,
  ElementRef,
  Input,
} from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { SelectUserService } from '../shared/services/select-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  public isValidUser: boolean = false;
  public idUserMaster: number;

  private userSub: Subscription;
  private statusUserSub: Subscription;
  private idUserSub: Subscription;

  private destroy$ = new Subject<void>();

  searchBox: any = document.getElementsByClassName('search-box');

  constructor(
    private elRef: ElementRef,
    private authService: AuthService,
    private selectUser: SelectUserService,
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.isAuthenticated = !!user;
    });

    this.statusUserSub = this.selectUser.currentState$.pipe(takeUntil(this.destroy$)).subscribe(
      (state) => (this.isValidUser = !!state)
    );

    this.idUserSub = this.selectUser.currentId$.pipe(takeUntil(this.destroy$)).subscribe(
      (id) => (this.idUserMaster = id)
    );
  }

  activateSearchbar() {
    this.searchBox[0].classList.toggle('active');
  }

  @HostListener('document:click', ['$event'])
  clickoutSearchbar(event) {
    if (!this.elRef.nativeElement.contains(event.target) && this.searchBox[0]?.classList?.value.includes('active')) {
      this.activateSearchbar();
    }
  }

  @HostListener('window:scroll', ['$event'])
  scrollNavBarEffect($event) {
    let navbarElement = document.querySelector('.navbar');
    if (window.pageYOffset > navbarElement?.clientHeight) {
      navbarElement?.classList.add('navbar-scrolled');
    } else {
      navbarElement?.classList.remove('navbar-scrolled');
    }
  }

  onLogout() {
    this.authService.logout();
    this.selectUser.logoutState();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.statusUserSub.unsubscribe();
    this.selectUser.currState();
    this.idUserSub.unsubscribe();

    this.destroy$.next();
    this.destroy$.complete();
  }

  onChangeUser(idUser: number) {
    this.selectUser.changeIdUser(idUser);
    this.selectUser.setStateUser();
  }
}
