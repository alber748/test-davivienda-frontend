import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SoapService } from '../../services/soap.service';
import { PersonSoap } from '../../models/soap-persona';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { MenuComponent } from "../../components/menu/menu.component";

@Component({
  selector: 'app-person-info',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent, MenuComponent], 
  templateUrl: './gestion-soap.component.html'
})
export class GestionSoapComponent implements OnInit {

  person?: PersonSoap;
  id: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private soapService: SoapService,
  ) {}

  ngOnInit(): void {
    
  }

  getPersonInfo(id: number): void {
    this.isLoading = true;
    this.soapService.getPersonInfo(id).subscribe(
      (data: any ) => {
        this.person = data.findPersonResult;
        this.isLoading = false;
        console.log(this.person)
      },
      (error : any) => {
        console.error('Error al obtener la información de la persona', error);
        this.errorMessage = 'No se pudo obtener la información.';
        this.isLoading = false;
      }
    );
  }
}