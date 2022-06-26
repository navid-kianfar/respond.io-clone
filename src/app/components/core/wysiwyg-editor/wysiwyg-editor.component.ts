import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CultureService } from '../../../services/core/culture.service';
import Guid from "../../../lib/guid";

@Component({
  selector: 'app-wysiwyg-editor',
  templateUrl: './wysiwyg-editor.component.html',
  styleUrls: ['./wysiwyg-editor.component.scss'],
})
export class WysiwygEditorComponent implements OnInit {
  // @ts-ignore
  @ViewChild('editor', { static: true }) editor;
  @Input() minimal: boolean;
  @Input() disabled: boolean;
  @Input() model: string;
  @Input() placeHolder: string;
  @Output() modelChange = new EventEmitter<string>();
  name: string;
  config: any;

  constructor(readonly cultureService: CultureService) {}

  ngOnInit() {
    this.name = 'editor-' + Guid.NewGuid();
    this.config = {
      allowedContent: true,
      removeFormatAttributes: ''
    };
    if (this.minimal) {
      this.config.height = 250;
      this.config.toolbar = [
        {
          name: 'basicstyles',
          items: [
            'Bold',
            'Italic',
            'Underline',
            'Strike',
            'Format',
            'FontSize',
            'TextColor',
            'BGColor',
          ],
        },
      ];
    }

    const editor = (window as any).CKEDITOR;
    if (editor) {
      Object.keys(editor.dtd.$removeEmpty).forEach(k => {
        editor.dtd.$removeEmpty[k] = false;
      });
    }
  }

  textChange($event: any) {
    this.model = $event;
    this.modelChange.emit(this.model);
  }
}
