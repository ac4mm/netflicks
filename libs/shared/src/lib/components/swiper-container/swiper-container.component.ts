import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import Swiper, { A11y, Mousewheel, Navigation, Pagination } from 'swiper';
import { UtilitiesService } from '../../services/utilities.service';
import { NfFullscreenLogoComponent } from '../fullscreen-logo/nf-fullscreen-logo.component';
import { NfFullscreenPlayerComponent } from '../fullscreen-player/nf-fullscreen-player.component';
import { PreviewModalContainerComponent } from '../../../../../feature/src/lib/home/preview-modal-container/preview-modal-container.component';

@Component({
  selector: 'nf-swiper-container',
  templateUrl: './swiper-container.component.html',
  styleUrls: ['./swiper-container.component.scss'],
})
export class SwiperContainerComponent implements OnInit, AfterViewInit {
  @Input() titleSlide: string;
  @Input() coverImages: string[] = [];
  @Input() logoImages: string[] = [];
  @Input() coverIndexImages: number[] = [];
  @Input() coverIndexImagesTMDB: number[] = [];
  @Input() numbersOfSeasons: string[] = [];
  @Input() genresCoverImages: string[] = [];

  randMatchScore: number[] = [];
  ratingNumberCover: (string | undefined)[] = [];

  //7+ Kids (10%), 13+ teenagers (20%), 16+ (40%), 18+ adults (60%)
  ratingNumberObject = { 7: 0.1, 13: 0.2, 16: 0.4, 18: 0.6 };

  showCheckIcon = true;
  showRefreshIcon = false;

  @ViewChild('player') player: any;
  // keyYTVideo: string;
  // playerVars: {
  //   autohide: 1;
  //   controls: 0;
  //   showinfo: 0;
  //   autoplay: 1;
  //   modestbranding: 1;
  //   disablekb: 1;
  //   rel: 0;
  //   fs: 0;
  //   playsinline: 1;
  //   loop: 1;
  //   allowfullscreen: 1;
  //   frameBorder: 0;
  // };

  indexSelectedItem: number;
  coverImagePreviewModal: string;

  private destroy$ = new Subject<void>();

  constructor(
    private utilitiesService: UtilitiesService,
    public dialogService: DialogService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    //Setting with random number, the match score
    this.randMatchScore = Array.from(
      { length: this.coverIndexImages.length },
      () => this.utilitiesService.getRandomIntBetweenRange(64, 100)
    );

    //setting rating number cover with distribution weight
    this.ratingNumberCover = this.getWeightedRandomNumberInArr(
      this.ratingNumberObject,
      7
    );
  }

  playVideo(indexTheMovieDb: number) {
    if (this.player) {
      this.player.pauseVideo();
    }

    const dialogFullScreenPlayer: DynamicDialogRef = this.dialogService.open(
      NfFullscreenPlayerComponent,
      {
        baseZIndex: 10000,
        modal: true,
        draggable: false,
        dismissableMask: true,
        showHeader: false,
        closeOnEscape: true,
        width: '100%',
        height: '100%',
        transitionOptions: '600ms',
        data: {
          indexTheMovieDb: indexTheMovieDb,
        },
      }
    );

    /* On close dialog, open FullScreenLogo and resume video */
    dialogFullScreenPlayer.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const dialogFullScreenLogo: DynamicDialogRef =
          this.openFullScreenLogo();

        setTimeout(() => {
          dialogFullScreenLogo.close();
          this.renderer.removeStyle(document.body, 'overflow-y');
        }, 2000);
        setTimeout(() => {
          this.onReplayVideo();
        }, 3000);
      });
  }

  onReplayVideo() {
    this.showRefreshIcon = false;
    this.player.seekTo(0);
    this.player.playVideo();
  }

  openFullScreenLogo() {
    return this.dialogService.open(NfFullscreenLogoComponent, {
      baseZIndex: 10001,
      modal: true,
      draggable: false,
      dismissableMask: true,
      showHeader: false,
      closeOnEscape: true,
      width: '100%',
      height: '100%',
      transitionOptions: '600ms',
    });
  }

  onClickShowCheckIcon() {
    this.showCheckIcon = !this.showCheckIcon;
  }

  openDialogCoverImage(
    coverImage: any,
    index: number,
    indexTvMazeSeries: number,
    indexTheMovieDb?: number,
    logoImageURL?: string
  ) {
    this.indexSelectedItem = index;
    this.coverImagePreviewModal = coverImage;

    if (this.player) {
      this.player.pauseVideo();
    }

    const dialog: DynamicDialogRef = this.dialogService.open(
      PreviewModalContainerComponent,
      {
        baseZIndex: 10000,
        modal: true,
        draggable: false,
        dismissableMask: true,
        showHeader: false,
        closeOnEscape: true,
        keepInViewport: true,
        data: {
          randMatchScore: this.randMatchScore,
          ratingNumberCover: this.ratingNumberCover,
          coverImagePreviewModal: this.coverImagePreviewModal,
          indexSelectedItem: this.indexSelectedItem,
          indexTvMazeSeries: indexTvMazeSeries,
          indexTheMovieDb: indexTheMovieDb,
          logoImageURL: logoImageURL,
        },
      }
    );

    /* On close dialog, resume video */
    dialog.onClose.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.player.playVideo();
    });
  }

  //Use prevision random algorithm with size
  getWeightedRandomNumberInArr(objWithWeight: any, size: number) {
    const arrWeightedRand = [];
    for (let i = 0; i < size; i++) {
      arrWeightedRand.push(
        this.utilitiesService.getWeightedRandomNumber(objWithWeight)
      );
    }

    return arrWeightedRand;
  }

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination, A11y, Mousewheel],
      autoHeight: true,
      slidesOffsetBefore: 40,
      slidesOffsetAfter: 130,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      pagination: {
        el: '.swiper-pagination',
      },
      // Default parameters
      slidesPerView: 7,
      spaceBetween: 10,
      // Responsive breakpoints
      breakpoints: {
        1201: {
          slidesPerView: 7,
          spaceBetween: 5,
        },
        1200: {
          slidesPerView: 7,
          spaceBetween: 5,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 5,
        },
        800: {
          slidesPerView: 5,
          spaceBetween: 5,
        },
        500: {
          slidesPerView: 5,
          spaceBetween: 5,
        },
        400: {
          slidesPerView: 4,
          spaceBetween: 5,
        },
        300: {
          slidesPerView: 4,
          spaceBetween: 5,
        },
        200: {
          slidesPerView: 3,
          spaceBetween: 5,
        },
      },
    });
  }
}
