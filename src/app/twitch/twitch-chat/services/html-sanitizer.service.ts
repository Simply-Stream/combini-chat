import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HtmlSanitizerService {
  protected entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;',
  };

  public sanitize(html: string): string {
    return String(html).replace(/[&<>"'\/]/g, s => this.entityMap[s]);
  }
}
