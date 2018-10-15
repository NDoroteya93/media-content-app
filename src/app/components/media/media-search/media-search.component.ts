import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-media-search',
  templateUrl: './media-search.component.html',
  styleUrls: ['./media-search.component.scss']
})
export class MediaSearchComponent {

  @Output() searchVideos = new EventEmitter<Observable<any>>();
  @Output() searchImages = new EventEmitter<string>();

  public searchForm: FormGroup; 
  private searchTerm$: Subject<any>;

  constructor(private formBuilder: FormBuilder) {

    this.initForm();
    this.onSearch();
  }

  public onSearch(): void {
    this.searchForm.controls.search.valueChanges
      .pipe(
        filter((value: string) => value.length > 2),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(result => {
          debugger;
          console.log(result);
          return result;
        })
      );
  }

  private initForm(): void {
    debugger;
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });
  }
}
