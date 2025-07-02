declare type HealthCheck = {
  "API Version": string;
  "Postgres Service": string;
  "Vapi Service": string;
};


declare type GlobalState = {
  token: string;
  vapiId: string;
  twilioNumber: string;
  business: {
    id: string;
    name: string;
    phone: string;
    country: string;
    industry: string;
  };
};


declare type Todo ={
  id: string;
  title : string;
  description: string;
}


