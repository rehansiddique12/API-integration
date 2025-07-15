declare type HealthCheck = {
  "API Version": string;
  "Postgres Service": string;
  "Vapi Service": string;
};


declare type GlobalState = {
  token: string;
  userdata:{
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    profile_picture: string,
  }
};


declare type Auth ={
  id: string;
  first_name : string;
  last_name : string;
  email: string;
  password: string;
}



declare type Userdata = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string;
}


declare type PostLoginResponse = {
  data: {
    data: {
      token: string;
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      profile_picture?: string;
    };
  };
};




declare type Items = {
  id: number;
  name: string;
  description: string;
  image_url: string;
}
