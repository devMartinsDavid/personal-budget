import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DbService } from '../../services/db/db.service';

import { ExpenseFormComponent } from '../../components/forms/expense-form/expense-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ExpenseFormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{ }
