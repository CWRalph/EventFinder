import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchBarService } from '@features/search-bar/search-bar.service';
import { SubscriberComponent } from '@shared/subscriber/subscriber.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '@app/state/user/userReducer';
import { LoginComponent } from '@core/authentication/login/login.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatIcon, FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent extends SubscriberComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('searchDropdown') dropdown!: ElementRef;
  private _value: string = '';
  private isFocused: boolean = false;
  private isLoggedIn: boolean = false;
  private isDialogOpen: boolean = false;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private searchBarService: SearchBarService) 
    {
    super();
  }


  @Input() placeholder: string = 'Search';
  @Input() results: string[] = [];
  @Output() onFocus: EventEmitter<void> = new EventEmitter<void>();
  @Output() onBlur: EventEmitter<void> = new EventEmitter<void>();
  @Output() onClear: EventEmitter<void> = new EventEmitter<void>();
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onEnter: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDropdownClick: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.unsubscribeOnDestroy(this.searchBarService.getQuery()).subscribe(
      (query) => (this._value = query),
    );

    this.store.select(selectIsLoggedIn).subscribe(login => {
      this.isLoggedIn = login;
    })
  }

  private blurSearchBar() {
    this.searchInput?.nativeElement?.blur();
    this.dropdown?.nativeElement?.blur();
  }

  public get value(): string {
    return this._value;
  }

  public set value(value: string) {
    this._value = value;
    this.onChange.emit(value);
  }

  public get inputPlaceholder(): string {
    return this.placeholder ?? 'Search';
  }

  public get dropdownContent(): string[] {
    return (this.results?.length ?? 0) > 0
      ? this.results
      : ['No results found'];
  }

  public get isSearchFocused(): boolean {
    return this.isFocused;
  }

  public focus(): void {
    this.onFocus.emit();
    this.isFocused = true;

    if (!this.isLoggedIn && this.isFocused && !this.isDialogOpen) {
      this.isDialogOpen = true;
      const dialogRef = this.dialog.open(LoginComponent);

      dialogRef.afterClosed().subscribe(() => {
        this.isDialogOpen = false;
        this.blur();
      });
    }
  }

  public blur(): void {
    this.onBlur.emit();
    this.isFocused = false;
    this.searchInput.nativeElement.blur();
  }

  public change() {
    this.onChange.emit(this.value);
    this.searchBarService.setQuery(this.value);
  }

  public clearInput(): void {
    this.value = '';
    this.onClear.emit();
    this.onChange.emit(this.value);
    this.searchBarService.setQuery(this.value);
  }

  public onEnterPressed() {
    this.onEnter.emit();
    this.blurSearchBar();
  }

  public onDropdownItemClicked(item: string) {
    this.onDropdownClick.emit(item);
    this.blurSearchBar();
    this.searchBarService.setQuery(item);
  }
}
