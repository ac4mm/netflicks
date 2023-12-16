import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'nf-speakerdown-button',
  template: `<button
    class="btn-circle btn-icon-cover"
    [ngClass]="mediumSize ? 'btn-circle-medium' : ''"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg"
      stroke="white"
      stroke-width="0.3"
    >
      <path
        d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z"
        fill="#fff"
      ></path>
    </svg>
  </button> `,
  styleUrl: './nf-buttons.component.scss',
  standalone: true,
  imports: [NgClass],
})
export class NfSpeakerdownButtonComponent {
  @Input() mediumSize = false;
}
