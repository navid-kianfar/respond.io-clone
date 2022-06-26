import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import {OperationResult} from "../../lib/operation-result";
import {StringDictionary} from "../../lib/dictionary";

@Injectable({
  providedIn: 'root',
})
export class FileService {
  readonly imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
  readonly audioExtensions = ['mp3', 'ogg', 'aac', 'wav', 'wave'];
  readonly videoExtensions = ['mp4', 'webm', 'ogv', 'ogg', 'mkv', 'avi'];
  readonly archiveExtensions = ['zip', 'rar', '7z', 'tar', 'gz'];
  readonly spredsheetExtensions = ['xls', 'xlsx', 'csv'];
  readonly documentExtensions = ['doc', 'docx', 'rtf', 'txt'];
  readonly presentationExtensions = ['ppt', 'pptx', 'pptm'];

  constructor(private readonly httpService: HttpService) {}

  async uploadFileNew(model: any): Promise<OperationResult<any>> {
    return await this.httpService.formUpload<string>(
      '/File/UploadImageNew',
      model,
      (percent) => {},
      false
    );
  }

  extractName(url: string): string {
    return (url || '').split('/').reverse()[0];
  }

  extension(file: string | File): string {
    const str = (file instanceof File ? file.name : file) || '';
    const parts = str.split('.');
    return parts[parts.length - 1].toLowerCase();
  }

  blob(element: HTMLImageElement, file: File) {
    const reader = new FileReader();
    // @ts-ignore
    reader.onload = (e) => (element.src = reader.result.toString());
    reader.readAsDataURL(file);
  }

  download(path: string, params: StringDictionary<any>) {
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', path);
    form.setAttribute('target', '_blank');
    if (params) {
      params.Keys().forEach((key) => {
        const hiddenField = document.createElement('input');
        hiddenField.setAttribute('name', key);
        hiddenField.setAttribute('value', params.Item(key));
        form.appendChild(hiddenField);
      });
    }
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }

  getImageBase64(image: File | string): Promise<string> {
    return new Promise((resolve) => {
      if (typeof image === 'string') {
        return resolve(image);
      }
      const reader = new FileReader();
      // @ts-ignore
      reader.onload = (e) => resolve(reader.result.toString());
      reader.readAsDataURL(image);
    });
  }

  getFiles(files: FileList): File[] {
    const result: File[] = [];
    for (let i = 0; i < files.length; i++) {
      result.push(files.item(i)!);
    }
    return result;
  }

  icon(file: File | string): string {
    if (this.isPdf(file)) { return '/assets/media/svg/files/pdf.svg'; }
    if (this.isArchive(file)) { return '/assets/media/svg/files/zip.svg'; }
    if (this.isVideo(file)) { return '/assets/media/svg/files/mp4.svg'; }
    if (this.isSpredsheet(file)) { return '/assets/media/svg/files/csv.svg'; }
    if (this.isImage(file)) { return '/assets/media/svg/files/jpg.svg'; }
    if (this.isDocument(file)) { return '/assets/media/svg/files/doc.svg'; }
    if (this.isAudio(file)) { return '/assets/media/svg/files/doc.svg'; }
    if (this.isPresentation(file)) { return '/assets/media/svg/files/doc.svg'; }
    return '';
  }

  isImage(file: string | File): boolean {
    const name = file instanceof File ? file.name : file;
    const ext = this.extension(name);
    return this.imageExtensions.indexOf(ext) !== -1;
  }

  isAudio(file: File | string) {
    const name = file instanceof File ? file.name : file;
    const ext = this.extension(name);
    return this.audioExtensions.indexOf(ext) !== -1;
  }

  isVideo(file: File | string) {
    const name = file instanceof File ? file.name : file;
    const ext = this.extension(name);
    return this.videoExtensions.indexOf(ext) !== -1;
  }

  isArchive(file: File | string) {
    const name = file instanceof File ? file.name : file;
    const ext = this.extension(name);
    return this.archiveExtensions.indexOf(ext) !== -1;
  }

  isPdf(file: File | string) {
    const name = file instanceof File ? file.name : file;
    return this.extension(name) === 'pdf';
  }

  isSpredsheet(file: File | string) {
    const name = file instanceof File ? file.name : file;
    const ext = this.extension(name);
    return this.spredsheetExtensions.indexOf(ext) !== -1;
  }

  isDocument(file: File | string) {
    const name = file instanceof File ? file.name : file;
    const ext = this.extension(name);
    return this.documentExtensions.indexOf(ext) !== -1;
  }

  isPresentation(file: File | string) {
    const name = file instanceof File ? file.name : file;
    const ext = this.extension(name);
    return this.presentationExtensions.indexOf(ext) !== -1;
  }
}
