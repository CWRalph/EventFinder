import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {CommonModule, NgForOf} from "@angular/common";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatIcon, FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  private _value: string = '';
  private isFocused: boolean = false;
  constructor() {}

  @Input() placeholder: string = 'Search';
  @Input() results: string[] = [];
  @Output() onFocus: EventEmitter<void> = new EventEmitter<void>();
  @Output() onBlur: EventEmitter<void> = new EventEmitter<void>();
  @Output() onClear: EventEmitter<void> = new EventEmitter<void>();
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();

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
  }

  public blur(): void {
    this.onBlur.emit();
    this.isFocused = false;
  }

  public change() {
    this.onChange.emit(this.value);
  }

  public clearInput(): void {
    this.value = '';
    this.onClear.emit();
    this.onChange.emit(this.value);
  }
}
