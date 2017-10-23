export class User {
  
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dateCreated: string;
    dateUpdated: string;
    jpegReference: string;
    applicationStatus: string;
  
    constructor(id: number, firstName: string, lastName: string, email: string,
       dateCreated: string, dateUpdated: string, jpegReference: string, applicationStatus: string) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.dateCreated = dateCreated;
      this.dateUpdated = dateUpdated;
      this.jpegReference = jpegReference;
      this.applicationStatus = applicationStatus;
    }
  }