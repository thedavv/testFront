export class User2 {
    
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      dateCreated: string;
      dateUpdated: string;
      jpegReference: string;
      applicationStatus: string;
      fileUpload: File;
    
      constructor(id: number, firstName: string, lastName: string, email: string,
         dateCreated: string, dateUpdated: string, jpegReference: string, applicationStatus: string, fileUpload:File) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateCreated = dateCreated;
        this.dateUpdated = dateUpdated;
        this.jpegReference = jpegReference;
        this.applicationStatus = applicationStatus;
        this.fileUpload = fileUpload;
      }
    }