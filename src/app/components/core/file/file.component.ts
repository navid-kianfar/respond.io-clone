import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { HttpService } from '../../../services/core/http.service';
import { FileService } from '../../../services/core/file.service';
import {FileType} from "../../../lib/enums";
import {OperationResultStatus} from "../../../lib/operation-result";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  // @ts-ignore
  @ViewChild('filePicker', { static: false }) filePicker;
  @Input() browse: string;
  @Input() backend: string;
  @Input() backendParams?: any;
  @Input() summary: string;
  @Input() extensions: string[];
  @Input() cssClass: string;
  @Input() disabled: boolean;
  @Input() uploadOnPick: boolean;
  @Input() clearAfterUpload: boolean;
  @Input() current: string;
  @Input() multiple: boolean;
  @Input() preview: boolean;
  @Input() small: boolean;
  @Input() fileType: FileType;
  @Input() thumbnail: boolean;
  @Input() placeHolder: string;
  @Input() thumbnailLabel: string;
  @Input() thumbnailIcon: string;
  @Input() model: File | File[] | any;
  @Input() triggerBrowse: EventEmitter<void>;
  @Output() onStart = new EventEmitter<void>();
  @Output() onError = new EventEmitter<void>();
  @Output() onProgress = new EventEmitter<number>();
  @Output() onFinished = new EventEmitter<void>();
  @Output() modelChange = new EventEmitter<File | File[]>();
  @Output() currentChange = new EventEmitter<string | string[]>();
  selectedFiles: File[];
  uploadPercent: number;
  uploading: boolean;
  allowedTypes: string;

  constructor(
    readonly fileService: FileService,
    readonly httpService: HttpService
  ) {}

  remove(item: File) {
    let index = this.selectedFiles.indexOf(item);
    if (index !== -1) {
      this.selectedFiles.splice(index, 1);
    }
    if (this.multiple) {
      const model = this.model as File[];
      index = model.indexOf(item);
      if (index !== -1) {
        model.splice(index, 1);
      }
    } else {
      // @ts-ignore
      this.model = null;
      this.removeCurrent();
    }
    this.filePicker.nativeElement.value = '';
    this.removeCurrent();
    this.modelChange.emit(this.model);
  }

  clear() {
    this.selectedFiles.length = 0;
    if (this.multiple) {
      this.model = [];
    } else {
      // @ts-ignore
      this.model = null;
      this.removeCurrent();
    }
    this.modelChange.emit(this.model);
    this.filePicker.nativeElement.value = '';
  }

  async onChange(files: FileList) {
    if (files && files.length) {
      this.removeCurrent();
    }
    if (!this.multiple) {
      this.selectedFiles = [];
    }
    this.selectedFiles = this.fileService.getFiles(files);
    if (this.multiple) {
      this.model = [...(this.model || []) as any[], ...this.selectedFiles];
    } else {
      this.model = this.selectedFiles[0];
    }
    this.modelChange.emit(this.model);
    if (this.selectedFiles.length) {
      this.removeCurrent();
      if (this.backend && this.uploadOnPick) {
        await this.processFiles();
      }
    }
  }

  async processFiles() {
    this.uploadPercent = 0;
    this.uploading = true;
    this.onStart.emit();
    const data = { ...this.backendParams, file: this.model };
    const op = await this.httpService.formUpload<any>(
      this.backend,
      data,
      (percent) => {
        this.uploadPercent = percent;
        this.onProgress.emit(percent);
      }
    );
    this.uploadPercent = 0;
    this.uploading = false;
    if (op.status !== OperationResultStatus.success) {
      // TODO: handle failed upload attempts
      this.onError.emit();
      return;
    }
    if (this.clearAfterUpload !== false) {
      this.clear();
    }
    this.onFinished.emit();
  }

  removeCurrent() {
    this.current = '';
    this.currentChange.emit('');
  }

  ngOnInit() {
    if (this.triggerBrowse) {
      this.triggerBrowse.subscribe(() => {
        this.filePicker.nativeElement.click();
      });
    }
    this.selectedFiles = [];
    this.extensions = this.extensions || [];
    this.uploading = false;
    this.uploadPercent = 0;
    this.uploadOnPick = this.uploadOnPick || false;
    if (this.extensions.length) {
      this.fileType = FileType.Specific;
    }
    this.fileType = this.fileType || FileType.Any;
    switch (this.fileType) {
      case FileType.Image:
        this.allowedTypes = 'image/*';
        break;
      case FileType.Audio:
        this.allowedTypes = 'audio/*';
        break;
      case FileType.Video:
        this.allowedTypes = 'video/*';
        break;
      case FileType.Excel:
        this.allowedTypes = '.xls,.xlsx';
        break;
      case FileType.Pdf:
        this.allowedTypes = '.pdf';
        break;
      case FileType.Word:
        this.allowedTypes = '.doc,.docx,.rtf';
        break;
      case FileType.Specific:
        this.allowedTypes = this.extensions.join(',');
        break;
      default:
        this.allowedTypes = '';
        break;
    }
  }
}
