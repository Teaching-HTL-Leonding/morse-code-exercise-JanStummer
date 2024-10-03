import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encode',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './encode.component.html',
  styleUrl: './encode.component.css'
})
export class EncodeComponent {
  inputText = signal<string>('');
  encodedMorse = signal<string>('');
  isValidInput = computed(() => /^[A-Z\s]*$/.test(this.inputText().trim().toUpperCase()));

  private morseCode: { [key: string]: string } = {
    A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..',
    J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-',
    R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..'
  };

  encodeText(): void {
    const cleanedText = this.inputText().trim().toUpperCase().replace(/\s+/g, ' ');

    if (!/^[A-Z\s]+$/.test(cleanedText)) {
      this.encodedMorse.set('');
      return;
    }

    const morse = cleanedText
      .split(' ')
      .map(word => word.split('').map(char => this.morseCode[char]).join(' '))
      .join(' / ');

    this.encodedMorse.set(morse); // Setzt das Signal für den kodierten Morse-Code
  }
}
