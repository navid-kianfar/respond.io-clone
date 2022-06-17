import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import {OperationResult, OperationResultStatus} from 'src/app/lib/operation-result';
import {NotificationService} from "./notification.service";
import {environment} from "../../../environments/environment";
import {GridFilter, GridResult} from "../../lib/grid";

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  defaultEndPoint: string;

  constructor(
    private readonly client: HttpClient,
    private readonly notificationService: NotificationService
  ) {
    this.defaultEndPoint = 'api_endpoint';
  }

  async post<T>(
    section: string,
    data?: any,
    handleNoneSuccess?: boolean
  ): Promise<OperationResult<T>> {
    return await this.postWithEndPoint('', section, data, handleNoneSuccess);
  }

  async postWithEndPoint<T>(
    endpoint: string,
    section: string,
    data?: any,
    handleNoneSuccess?: boolean
  ): Promise<OperationResult<T>> {
    return new Promise<OperationResult<T>>((resolve) => {
      try {
        endpoint = endpoint || this.defaultEndPoint;
        // @ts-ignore
        const path = environment[endpoint] + section;
        data = data || {};
        this.client.post(path, data).subscribe(
          (op: any) => {
            if (
              op.status !== OperationResultStatus.success &&
              handleNoneSuccess !== false
            ) {
              this.notificationService.handleRequest(op);
            }
            resolve(op);
          },
          (err: Error) => {
            this.notificationService.error('GENERAL_FAILED');
            resolve(OperationResult.Failed<T>());
          }
        );
      } catch (e: any) {
        this.notificationService.error('GENERAL_FAILED');
        resolve(OperationResult.Failed<T>(e));
      }
    });
  }

  async delete<T>(section: string): Promise<OperationResult<T>> {
    return await this.deleteWithEndPoint('', section);
  }

  async deleteWithEndPoint<T>(
    endpoint: string,
    section: string,
    handleNoneSuccess?: boolean
  ): Promise<OperationResult<T>> {
    return new Promise<OperationResult<T>>((resolve) => {
      try {
        endpoint = endpoint || this.defaultEndPoint;
        // @ts-ignore
        const path = environment[endpoint] + section;
        this.client.delete(path).subscribe(
          (op: any) => {
            if (
              op.status !== OperationResultStatus.success &&
              handleNoneSuccess !== false
            ) {
              this.notificationService.handleRequest(op);
            }
            resolve(op);
          },
          (err: Error) => {
            this.notificationService.error('GENERAL_FAILED');
            resolve(OperationResult.Failed<T>());
          }
        );
      } catch (e: any) {
        this.notificationService.error('GENERAL_FAILED');
        resolve(OperationResult.Failed<T>(e));
      }
    });
  }

  async get<T>(section: string, data?: any): Promise<OperationResult<T>> {
    return await this.getWithEndPoint('', section, data);
  }

  async getWithEndPoint<T>(
    endpoint: string,
    section: string,
    data?: any,
    handleNoneSuccess?: boolean
  ): Promise<OperationResult<T>> {
    return new Promise<OperationResult<T>>((resolve) => {
      try {
        endpoint = endpoint || this.defaultEndPoint;
        // @ts-ignore
        const path = environment[endpoint] + section;
        this.client.get(path).subscribe(
          (op: any) => {
            if (
              op.status !== OperationResultStatus.success &&
              handleNoneSuccess !== false
            ) {
              this.notificationService.handleRequest(op);
            }
            resolve(op);
          },
          (err: Error) => {
            this.notificationService.error('GENERAL_FAILED');
            resolve(OperationResult.Failed<T>());
          }
        );
      } catch (e: any) {
        this.notificationService.error('GENERAL_FAILED');
        resolve(OperationResult.Failed<T>(e));
      }
    });
  }

  grid<T>(
    param: GridFilter,
    endpoint: string = ''
  ): Promise<OperationResult<GridResult<T>>> {
    const data = {
      page: param.page,
      pageSize: param.pageSize,
      params: param.params || {},
      sortBy: param.sortBy,
      filterBy: param.filterBy,
      sortOrder: param.sortOrder,
    };
    return this.postWithEndPoint<GridResult<T>>(endpoint, param.backend, data);
  }

  download(
    section: string,
    data: any,
    fileName: string = 'download.zip'
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        const path = environment.api_endpoint + section;
        data = data || {};
        this.client
          .post(path, data, {
            responseType: 'blob',
            observe: 'body',
          })
          .subscribe(
            (res: Blob) => {
              const a = document.createElement('a');
              a.href = URL.createObjectURL(res);
              a.download = fileName;
              a.click();
              resolve();
            },
            (err: Error) => {
              reject(err);
            }
          );
      } catch (e) {
        this.notificationService.error('GENERAL_FAILED');
        reject(e);
      }
    });
  }

  async formUpload<T>(
    section: string,
    model: any,
    onProgress: (percent: number) => void,
    handleNoneSuccess?: boolean
  ): Promise<OperationResult<T>> {
    if (!onProgress) {
      onProgress = () => {};
    }
    return new Promise((resolve, reject) => {
      try {
        const filesNames: string[] = [];
        const files: File[] = [];
        Object.keys(model).forEach((k) => {
          if (model[k] instanceof File) {
            filesNames.push(k);
            files.push(model[k]);
            delete model[k];
          } else if (Array.isArray(model[k]) && model[k][0] instanceof File) {
            (model[k] as any[]).forEach((f, i) => {
              filesNames.push(k + '_' + i);
              files.push(f);
            });
            delete model[k];
          }
        });
        model.filesNames = filesNames;
        const data = { data: JSON.stringify(model) };
        const path = environment.api_endpoint + section;
        const formData = new FormData();
        for (let i = 0; i < filesNames.length; i++) {
          // @ts-ignore
          formData.append(filesNames[i], files[i]);
        }
        Object.keys(data).forEach((key) => {
          // @ts-ignore
          formData.append(key, data[key]);
        });
        const uploadReq = new HttpRequest('POST', path, formData, {
          reportProgress: true,
        });
        this.client.request(uploadReq).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              const progress = Math.round((100 * event.loaded) / event.total);
              onProgress(progress);
            } else if (event.type === HttpEventType.Response) {
              const op = event.body as Response;
              if (
                op.status !== OperationResultStatus.success &&
                handleNoneSuccess !== false
              ) {
                this.notificationService.handleRequest(op.status);
              }
              resolve(event.body as any);
            }
          },
          (err) => {
            this.notificationService.error('GENERAL_FAILED');
            resolve(OperationResult.Failed<T>(err));
          }
        );
      } catch (e: any) {
        this.notificationService.error('GENERAL_FAILED');
        resolve(OperationResult.Failed<T>(e));
      }
    });
  }

  formDownload(section: string, data: any) {
    this.post_to_url(environment.api_endpoint + section, data || {}, 'post');
  }

  private post_to_url(path: string, params: any, method: string) {
    method = method || 'post';
    const form = document.createElement('form');
    form.setAttribute('method', method);
    form.setAttribute('action', path);
    form.setAttribute('target', '_blank');

    const addField = (k: string, value: string) => {
      const hiddenField = document.createElement('input');
      hiddenField.setAttribute('type', 'hidden');
      hiddenField.setAttribute('name', k);
      hiddenField.setAttribute('value', value);

      form.appendChild(hiddenField);
    };

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if (params[key] instanceof Array) {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < params[key].length; i++) {
            addField(key, params[key][i]);
          }
        } else {
          addField(key, params[key]);
        }
      }
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }
}
