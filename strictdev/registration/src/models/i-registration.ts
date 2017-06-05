export class IRegistration {

  dob?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_area?: string;
  phone?: string;
  gender?: string;
  occupation?: string;
  relationship_status?: string;
  interested_in?: string;
  have_kids?: string;
  looking_for?: string;

  datestamp?: string;

  shortid?: string;
  recaptcha?: string;
  paid?: boolean;

  constructor() {

    this.dob = '';
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.phone_area = '';
    this.phone = '';
    this.gender = '';
    this.occupation = '';
    this.relationship_status = '';
    this.interested_in = '';
    this.have_kids = '';
    this.looking_for = '';


  }
}
