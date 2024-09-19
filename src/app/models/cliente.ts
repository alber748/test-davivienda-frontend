export interface ClienteSend {
      dui: string;
      nit: string;
      nombres: string;
      apellidos: string;
      sexo: string;
      actividadesEconomicas: { id: number };
      estadoCivil: { id: number };
    }

    export interface Cliente {
      id: number;
      dui: string;
      nit: string;
      nombres: string;
      apellidos: string;
      sexo: string;
      actividadesEconomicas: ActividadesEconomicas;
      estadoCivil: EstadoCivil;
    }
    
    export interface ActividadesEconomicas {
      id: number;
      descripcion: string;
    }
    
    export interface EstadoCivil {
      id: number;
      descripcion: string;
    }