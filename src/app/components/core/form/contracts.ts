import { EventEmitter } from '@angular/core';
import {DropdownKnownList, FileType, FormElementType} from "../../../lib/enums";

export interface FormViewModel {
  disabled?: boolean;
  title?: string;
  visible?: boolean;
  size?: number;
  label?: string;
  elements: IFormElement[];
}

export interface IFormElementFilePicker extends IFormElement {
  params: {
    model?: File | File[];
    disabled?: boolean;
    placeHolder?: string;
    backend?: string;
    browse?: string;
    backendParams?: any;
    summary?: string;
    extensions?: string[];
    cssClass?: string;
    data?: any;
    uploadOnPick?: boolean;
    clearAfterUpload?: boolean;
    current?: string;
    multiple?: boolean;
    preview?: boolean;
    fileType?: FileType;
    thumbnail?: boolean;
    small?: boolean;
    thumbnailLabel?: string;
    thumbnailIcon?: string;
    onStart?: EventEmitter<void>;
    onError?: EventEmitter<void>;
    onProgress?: EventEmitter<number>;
    onFinished?: EventEmitter<void>;
    modelChange?: EventEmitter<File | File[]>;
    currentChange?: EventEmitter<string | string[]>;
  };
}

export interface IFormElementNumber extends IFormElement {
  validation?: IFormElementNumberValidation;
  params: {
    disabled?: boolean;
    model: number;
    min?: number;
    max?: number;
    onChange?: (val: number) => void;
  };
}

export interface IFormElementTimePicker extends IFormElement {
  validation?: IFormElementTimePickerValidation;
  params: {
    disabled?: boolean;
    model: string;
    cssClass?: string;
    appendText?: string;
    prependText?: string;
  };
}

export interface IFormElementCheckbox extends IFormElement {
  params: {
    disabled?: boolean;
    model: boolean;
    label: string;
    summary?: string;
    onChange?: (val: boolean) => void;
  };
}

export interface IFormElementSwitch extends IFormElement {
  params: {
    disabled?: boolean;
    model: boolean;
    beforeLabel?: string;
    afterLabel?: string;
    onChange?: (val: boolean) => void;
  };
}

export interface IFormElementCaptcha extends IFormElement {
  params: {
    disabled?: boolean;
    model: IFormElementCaptchaModel;
  };
}

export interface IFormElementInput extends IFormElement {
  params: {
    model: string;
    textArea?: boolean;
    password?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    growable?: boolean;
    numeric?: boolean;
    appendIcon?: string;
    prependIcon?: string;
    label?: string;
    description?: string;
    ltr?: boolean;
    autofocus?: boolean;
    placeHolder?: string;
    rows?: number;
  };
}

export interface IFormElementEditor extends IFormElement {
  params: {
    model: string;
    readonly?: boolean;
    disabled?: boolean;
    placeHolder?: string;
  };
}

export interface IFormElementPhoneNumber extends IFormElement {
  params: {
    model: string;
    readonly?: boolean;
    disabled?: boolean;
    placeHolder?: string;
  };
}

export interface IFormElementLabel extends IFormElement {
  params: {
    label: string;
  };
}

export interface IFormElementButton extends IFormElement {
  params: {
    model: string;
    label?: string;
    requireModel?: boolean;
    action: () => Promise<void>;
  };
}

export interface IFormElement {
  type?: FormElementType;
  config: IFormElementConfiguration;
  validation?: IFormElementStringValidation;
  params: any;
}

export interface IFormElementDatePicker extends IFormElement {
  params: {
    min?: Date;
    max?: Date;
    culture?: string;
    disabled?: boolean;
    multiple?: boolean;
    time?: boolean;
    model: Date;
    cssClass?: string;
    allowNull?: boolean;
    pickButton?: boolean;
    plateOpen?: boolean;
    from?: Date;
    to?: Date;
    minDays?: number;
    minMonths?: number;
    minYears?: number;
    maxDays?: number;
    maxMonths?: number;
    maxYears?: number;
    fromToday?: boolean;
    tillToday?: boolean;
    onChange?: (val: Date) => void;
  };
}

export interface IFormElementDropDown extends IFormElement {
  params: {
    picked?: (val: any) => void;
    loaded?: (items: any[]) => void;
    model: any;
    items: any[];
    except?: any[];
    acceptOnly?: any[];
    autoPickFirst?: boolean;
    filter?: boolean;
    disabledSort?: boolean;
    enumInfo?: boolean;
    ltr?: boolean;
    disabled?: boolean;
    label?: string;
    backend?: string;
    backendMethod?: string;
    textField?: string;
    valueField?: string;
    prependIcon?: string;
    chooseLabel?: string;
    enum?: string;
    choose?: boolean;
    waiting?: boolean;
    allowClear?: boolean;
    backendParams?: any;
    enumExcept?: number[];
    knownList?: DropdownKnownList;
    multiple?: boolean;
    markField?: string;
  };
}

export interface IFormElementAutoComplete extends IFormElement {
  params: {
    picked?: (val: any) => void;
    loaded?: (items: any[]) => void;
    model: any;
    items: any[];
    ltr?: boolean;
    pattern?: RegExp;
    disabled?: boolean;
    backend?: string;
    textField?: string;
    valueField?: string;
    waiting?: boolean;
    backendParams?: any;
  };
}

export interface IFormElementTag extends IFormElement {
  params: {
    removed?: (val: any) => void;
    added?: (val: any) => void;
    model: any[];
    disabled?: boolean;
  };
}

export interface IFormElementMultiSelect extends IFormElement {
  params: {
    removed?: (val: any) => void;
    picked?: (val: any) => void;
    loaded?: (items: any[]) => void;
    model: any[];
    items: any[];
    except?: any[];
    acceptOnly?: any[];
    enumInfo?: boolean;
    ltr?: boolean;
    disabled?: boolean;
    filter?: boolean;
    label?: string;
    backend?: string;
    textField?: string;
    valueField?: string;
    prependIcon?: string;
    chooseLabel?: string;
    choose?: boolean;
    waiting?: boolean;
    allowClear?: boolean;
    backendParams?: any;
    enum?: string;
    enumExcept?: number[];
  };
}

export interface IFormElementConfiguration {
  showElement?: boolean;
  toggleElement?: boolean;
  toggleElementCheckbox?: boolean;
  cssClass?: string;
  label?: string;
  description?: string;
  labelPostFix?: string;
  hideLabel?: boolean;
  visible?: boolean;
  labelSize?: number;
  field: string;
  link?: {
    hide?: boolean;
    url: string;
    title: string;
    cssClass: string;
  };
  advancedFilter?: {
    type: number;
    title: string;
    items: any[];
    field: string;
    model: any;
    default?: any;
    picked?: (val: any) => void;
  };
}

export interface IFormElementValidation {
  required: { value: boolean; message?: string };
  errors?: string[];
}

export interface IFormElementStringValidation extends IFormElementValidation {
  length?: { value: number; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  match?: { toField: string; message: string };
  pattern?: { value: RegExp; message: string };
}

export interface IFormElementNumberValidation extends IFormElementValidation {
  min?: { value: number; message: string };
  max?: { value: number; message: string };
}

export interface IFormElementTimePickerValidation
  extends IFormElementValidation {
  min?: { value: number; message: string };
  max?: { value: number; message: string };
}

export interface IFormElementCaptchaModel {
  token: string;
  code: string;
  expire: string;
}
export interface ModalProgress {
  uploading: boolean;
  uploadPercent: number;
}
