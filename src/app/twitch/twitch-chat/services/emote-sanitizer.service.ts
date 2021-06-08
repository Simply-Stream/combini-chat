import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmoteSanitizerService {
  /**
   * @param {string} emoteCode
   * @returns {string}
   */
  sanitize(emoteCode: string): string {
    return emoteCode.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
