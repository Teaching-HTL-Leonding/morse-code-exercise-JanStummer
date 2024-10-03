import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-decode',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './decode.component.html',
  styleUrl: './decode.component.css'
})
export class DecodeComponent {

  inputMorse = signal<string>('');
  decodedText = signal<string>('');
  errorMessage = signal<string>('');
  isValidMorse = computed(() => /^[.\-\/\s]*$/.test(this.inputMorse().trim()));


  private reverseMorseCode: { [key: string]: string } = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F', '--.': 'G',
    '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N',
    '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T', '..-': 'U',
    '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y', '--..': 'Z'
  };


  decodeMorse(): void {
    const cleanedMorse = this.inputMorse().trim().replace(/\s{2,}/g, ' ');

    if (!/^[.\-\/\s]+$/.test(cleanedMorse)) {
      this.errorMessage.set('Invalid Morse code: Only dots, dashes, spaces, and slashes are allowed');
      this.decodedText.set('');
      return;
    }

    try {
      const decoded = cleanedMorse
        .split(' / ')
        .map(word => word.split(' ').map(code => {
          if (!this.reverseMorseCode[code]) {
            throw new Error('Invalid Morse code: Unknown combination of dots and dashes');
          }
          return this.reverseMorseCode[code];
        }).join(''))
        .join(' ');

      this.errorMessage.set('');
      this.decodedText.set(decoded);
    } catch (error: any) {
      this.errorMessage.set(error.message);
      this.decodedText.set('');
    }
  }
}
