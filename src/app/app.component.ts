import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppService } from './app.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Clipboard } from '@angular/cdk/clipboard';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'shortener-url-frontend';
  url: FormControl;
  searchForm: FormGroup;
  modalRef: BsModalRef;
  responseUrl: string | undefined;
  isError: boolean;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private modalService: BsModalService,
    private clipboard: Clipboard
  ) {
    this.url = this.fb.control('');
    this.searchForm = this.fb.group({
      url: this.url,
    });
  }

  async onSubmit(template: TemplateRef<any>): Promise<void> {
    try {
      this.isError = false;
      const response = await this.appService
        .shortenUrl(this.url.value)
        .toPromise();
      this.responseUrl = response?.shortUrl;
    } catch (err) {
      this.isError = true;
      if (err instanceof HttpErrorResponse) {
        this.responseUrl = Array.isArray(err.error.message)
          ? err.error.message[0]
          : err.error.message;
      } else {
        console.log('Unexpected error', err);
      }
    } finally {
      this.openModal(template);
      this.url.reset();
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  copyUrl() {
    if (this.responseUrl) {
      this.clipboard.copy(this.responseUrl);
      this.modalRef.hide();
    }
  }
}
