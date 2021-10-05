import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintInvoiceDialogComponent } from './print-invoice-dialog.component';

describe('PrintInvoiceDialogComponent', () => {
  let component: PrintInvoiceDialogComponent;
  let fixture: ComponentFixture<PrintInvoiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintInvoiceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintInvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
