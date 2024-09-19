export interface Address {
      street: string;
      city: string;
      state: string;
      zip: string;
    }
    
    export interface PersonSoap {
      name: string;
      ssn: string;
      dob: string;
      age: number;
      home: Address;
      office: Address;
      favoriteColors: {
        favoriteColorsItem: string[];
      };
    }