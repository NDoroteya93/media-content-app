import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-media-search',
  templateUrl: './media-search.component.html',
  styleUrls: ['./media-search.component.scss']
})
export class MediaSearchComponent implements OnInit {

  @Output() searchVideos = new EventEmitter<Subject<any>>();
  @Output() searchImages = new EventEmitter<Subject<any>>();

  public searchForm: FormGroup;
  private searchTerm$: Subject<any>;

  constructor(private formBuilder: FormBuilder) {
    this.searchTerm$ = new Subject<any>();
  }

  public ngOnInit(): void {
    this.initForm();
    this.onSearch();
  }

  public onSearch(): void {
    this.searchForm.controls.search.valueChanges
      .subscribe(result => {
       this.searchTerm$.next(result);
      });
    this.searchVideos.emit(this.searchTerm$);
  }

  private initForm(): void {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });
  }
}
