import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppService } from './app.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Clipboard } from '@angular/cdk/clipboard';

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
  shortUrl: string;

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

  onSubmit(template: TemplateRef<any>): void {
    this.appService.shortenUrl(this.url.value).subscribe((data) => {
      this.shortUrl = data.shortUrl;
      this.openModal(template);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  copyUrl() {
    this.clipboard.copy(this.shortUrl);
    this.modalRef.hide();
    this.url.reset();
  }
}
