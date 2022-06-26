import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../../../services/core/http.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  MatColumnDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { NotificationService } from '../../../services/core/notification.service';
import {findAncestor, innerDimensions, ResizeSensor} from "../../../lib/helpers/html.helpers";
import {GridCommand} from "../../../lib/grid";
import {MaterialTranslatorService} from "../../../services/core/material-translator.service";
import {OperationResultStatus} from "../../../lib/operation-result";


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent<T>
  implements OnInit, OnDestroy, AfterContentInit, OnChanges
{
  commandListener: Subscription;
  dataSource = new MatTableDataSource<T>([]);
  query: string;
  sortBy: string;
  sortOrder: string;
  filterBy: string;
  selectedRowIndex: number;
  desktop: boolean;
  paint: boolean;
  parentElement: HTMLElement;

  @Input() method: string;
  @Input() columns: string[];
  @Input() create: boolean;
  @Input() filter: boolean;
  @Input() showFooter: boolean;
  @Input() disabled: boolean;
  @Input() headerHeight: number;
  @Input() footerHeight: number;
  @Input() rowHeight: number;
  @Input() cssClass: string;
  @Input() backend: string;
  @Input() backendParams: any;
  @Input() pageSize: number;
  @Input() rows: T[];
  @Input() isLoading: boolean;
  @Input() currentPage: number;
  @Input() totalPages: number;
  @Input() totalItems: number;
  @Input() disableRowHighlight: boolean;
  @Input() commander: EventEmitter<GridCommand<any>>;
  @Output() rowsChange = new EventEmitter<any[]>();
  @Output() isLoadingChange = new EventEmitter<boolean>();
  @Output() currentPageChange = new EventEmitter<number>();
  @Output() totalPagesChange = new EventEmitter<number>();
  @Output() totalItemsChange = new EventEmitter<number>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<T>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;

  selectedColumns: MatColumnDef[];
  resizeListener: { dispose: () => void };
  constructor(
    readonly httpService: HttpService,
    private readonly translatorService: MaterialTranslatorService,
    private readonly notificationService: NotificationService,
    private readonly elementRef: ElementRef
  ) {}

  //#region life cycle

  ngOnInit() {
    this.desktop = true;
    this.selectedColumns = [];
    this.currentPage = 1;
    this.pageSize = this.pageSize || 10;
    this.totalItems = 0;
    this.totalPages = 0;
    if (this.showFooter) {
      this.currentPage = 1;
      if (this.rowHeight === undefined) {
        this.rowHeight = 30;
      }
      if (this.headerHeight === undefined) {
        this.headerHeight = 30;
      }
      if (this.footerHeight === undefined) {
        this.footerHeight = 30;
      }
    }
    if (!this.backend && !this.rows) {
      this.rows = [];
    }
    if (this.commander) {
      this.commandListener = this.commander.subscribe(async (command) =>
        this.onCommand(command)
      );
    }
    setTimeout(() => this.updateDataSource(), 100);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['columns'] && !changes['columns'].firstChange) {
      this.repaintColumns(changes['columns'].currentValue);
      return;
    }

    if (!this.backend && changes['rows']) {
      this.updateDataSource();
    }
  }

  ngOnDestroy() {
    if (this.commandListener) {
      this.commandListener.unsubscribe();
    }
    if (this.resizeListener) {
      this.resizeListener.dispose();
    }
  }

  ngAfterContentInit(): void {
    this.translatorService.paginator(this.paginator);
    this.repaintColumns();
    this.paint = true;
  }

  //endregion

  //#region rendering

  repaintColumns(columns: any = null) {
    const grid = this.elementRef.nativeElement.querySelector('.af-grid');

    if (this.cssClass) {
      grid.classList.add(this.cssClass);
    }

    if (!this.parentElement) {
      this.parentElement = findAncestor(grid, 'full-grid') ||
        this.elementRef.nativeElement.parentElement;
      this.resizeListener = ResizeSensor(this.parentElement, (e: any) => {
        setTimeout(() => this.repaintColumns(), 50);
      });
    }

    const innerSize = innerDimensions(this.parentElement);
    grid.style.maxWidth = innerSize.width + 'px';
    grid.style.width = innerSize.width + 'px';
    grid.style.maxHeight = innerSize.height + 'px';
    grid.style.height = innerSize.height + 'px';
    this.selectedColumns = (columns || this.columns || []).map((c: string) => {
      return this.columnDefs.find(i => i.name === c);
    });
    setTimeout(() => this.resizeRows(), 50);
  }

  resizeRows() {
    const innerSize = innerDimensions(this.parentElement);
    const grid = this.elementRef.nativeElement.querySelector('.af-grid');
    grid.style.maxWidth = innerSize.width + 'px';
    grid.style.width = innerSize.width + 'px';
    grid.style.maxHeight = innerSize.height + 'px';
    grid.style.height = innerSize.height + 'px';

    const gridHeader = grid.querySelector('.grid-header');
    const gridFooter = grid.querySelector('.grid-footer');
    const gridContent = grid.querySelector('.grid-content');

    grid.querySelectorAll('.grid-content .grid-row').forEach((r: any) => {
      r.style.width = gridHeader.scrollWidth + 'px';
    });

    const bound = this.parentElement.getBoundingClientRect();
    const headerBound = gridHeader.getBoundingClientRect();
    const footerBound = gridFooter.getBoundingClientRect();

    const headerHeight = headerBound.height;
    const footerHeight = footerBound.height;

    const minHeight = 350;
    let maxHeight = innerSize.height - headerHeight - footerHeight;

    // const minRequiredHeight = headerHeight + footerHeight + minHeight;
    // const remaining = window.innerHeight - (bound.top + minRequiredHeight);
    //
    // if (remaining > 0 && (remaining < (maxHeight - minHeight))) {
    //   maxHeight = minHeight + remaining;
    // } else {
    //   maxHeight = minHeight;
    // }

    gridContent.style.maxHeight = maxHeight + 'px';
    gridContent.style.minHeight = maxHeight + 'px';
  }

  onScroll($event: any) {
    $event.stopPropagation();
    $event.preventDefault();
  }

  onBodyScroll(body: any, header: any) {
    header.scrollLeft = body.scrollLeft;
    header.scrollRight = body.scrollRight;
  }

  selectRow(row: any) {
    if (!this.disableRowHighlight){
      this.selectedRowIndex =  row;
    }
  }

  //endregion

  //#region data source

  sort($event: any, headerRow: any) {
    const headerColumn =
      $event.target.localName === 'i'
        ? $event.target.parentNode
        : $event.target;
    if (
      headerColumn.localName !== 'div' ||
      this.isLoading ||
      headerColumn.classList.contains('mat-column-operations') ||
      headerColumn.classList.contains('skip-sort')
    ) {
      return;
    }
    const index = Array.from(headerRow.children).indexOf(headerColumn);
    const prevOrder = headerColumn.attributes.sortOrder;
    const sortOrder = prevOrder
      ? prevOrder.value === 'ASC'
        ? 'DESC'
        : 'ASC'
      : 'ASC';
    const sortOrderIcon = document.createElement('i');
    sortOrderIcon.onclick = (e) => {
      e.preventDefault();
    };
    sortOrderIcon.className = `sort-by-icon ec-iconarrow-${
      sortOrder === 'ASC' ? 'up' : 'down'
    }`;
    for (let counter = 0; counter < headerRow.children.length; counter++) {
      const el = headerRow.children.item(counter);
      if (el.attributes.sortOrder) {
        el.removeAttribute('sortOrder');
        if (el.lastChild && el.lastChild.classList.contains('sort-by-icon')) {
          el.lastChild.remove();
        }
        break;
      }
    }
    headerColumn.appendChild(sortOrderIcon);
    headerColumn.setAttribute('sortOrder', sortOrder);
    this.sortBy = this.columnDefs.get(index)?.name || '';
    this.sortOrder = sortOrder;
    this.filterResult();
  }

  calculateOf() {
    if (!this.totalItems) {
      return 0;
    }
    if (this.totalItems < this.pageSize) {
      return this.totalItems;
    }
    return (this.currentPage - 1) * this.pageSize + this.pageSize;
  }

  pageChange($event: PageEvent) {
    this.pageSize = $event.pageSize;
    this.currentPage = $event.pageIndex + 1;
    this.updateDataSource(true);
  }

  filterResult() {
    this.currentPage = 1;
    this.currentPageChange.emit(1);
    this.updateDataSource();
  }

  async onCommand(command: GridCommand<any>) {
    if (command.goToPage) {
      await this.changePage(command.goToPage);
    }
    if (command.firstPage) {
      await this.changePage(1);
    }
    if (command.lastPage) {
      await this.changePage(this.totalPages);
    }
    if (command.nextPage) {
      if (this.totalPages <= this.currentPage + 1) {
        await this.changePage(this.currentPage + 1);
      }
    }
    if (command.prevPage) {
      if (this.currentPage > 1) {
        await this.changePage(this.currentPage - 1);
      }
    }
    if (command.reload) {
      this.currentPage !== 1
        ? await this.changePage(1)
        : await this.updateDataSource();
    }
  }

  async changePage(page: number) {
    if (this.currentPage === page) {
      return;
    }
    this.currentPage = page;
    this.currentPageChange.emit(page);
    await this.updateDataSource(true);
  }

  async updateDataSource(pageChanged: boolean = false) {
    this.selectedRowIndex = -1;
    this.dataSource.data = [];
    if (this.backend) {
      this.isLoading = true;
      this.isLoadingChange.emit(this.isLoading);
      const op = await this.httpService.grid<T>({
        backend: this.backend,
        params: {
          ...(this.backendParams || {}),
        },
        page: this.currentPage || 1,
        pageSize: this.pageSize || 10,
        sortBy: this.sortBy,
        filterBy: this.filterBy,
        sortOrder: this.sortOrder
          ? this.sortOrder === 'ASC'
            ? 1
            : 2
          : 1,
      });
      this.isLoading = false;
      this.isLoadingChange.emit(this.isLoading);
      if (!op || op.status !== OperationResultStatus.success) {
        // TODO: handle error;
        this.notificationService.error(op?.message || '');
        return;
      }
      this.totalItems = op.data?.totalItems || 0;
      this.totalPages = op.data?.totalPages || 0;
      this.dataSource = new MatTableDataSource<T>(op.data?.items || []);
      this.dataSource.paginator = this.paginator;
      this.totalItemsChange.emit(this.totalItems);
      this.rowsChange.emit(op.data?.items || []);
      this.totalPagesChange.emit(this.totalPages);
    } else {
      this.totalItems = this.rows.length;
      this.totalPages = 1;
      this.dataSource = new MatTableDataSource<T>(this.rows);
      this.dataSource.paginator = this.paginator;
      this.totalItemsChange.emit(this.totalItems);
    }

    setTimeout(() => {
      this.paginator.length = this.totalItems;
      this.paginator.pageSize = this.pageSize;
      this.paginator.pageIndex = this.currentPage - 1;
      this.resizeRows();
    }, 200);
  }

  //endregion
}
