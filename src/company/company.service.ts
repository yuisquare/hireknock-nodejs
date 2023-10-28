import { Injectable } from '@nestjs/common';
import { Company } from './schemas/company.schema';
import { CompanyRepository } from './company.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) { }

  async registerCompany(company_details) {
    let { company_name, email, mobile_no, location, industry_type, total_employees_count, linked_in_link, website_link, password } = company_details
    try {
      let emailExist = await this.companyRepository.findOne({ email})
      if(emailExist){
        return{
              status:204,
              message:"Email already registered.",
              resultSet:[]
            }
      }
      let mobileNoExist = await this.companyRepository.findOne({mobile_no})
      if(mobileNoExist){
        return{
              status:204,
              message:"Mobile number already registered.",
              resultSet:[]
            }
      }
      
      password = password && await bcrypt.hash(password, 10);
      let newComapny = await this.companyRepository.create({
        company_name,
        email,
        mobile_no,
        location,
        industry_type,
        total_employees_count,
        linked_in_link,
        website_link,
        password
      })
      if(newComapny){
        return{
          status:200,
          message:"Successfully registered the company, will notify you once verified by admin.",
          resultSet: newComapny
        }
      }
    } catch (err) {
      console.log("error in registerCompany function >>>", err);
      return {
        status: 500,
        message: err ? (err.message || (err.response && err.response.message)) : "Something went wrong, server error.",
        error: err
      }
    }
  }

  async companyLogin(logindata) {
    let { email, password } = logindata

    try {
      let companyExist = await this.companyRepository.findOne({ email })
      if (companyExist) {
        if(!companyExist.is_verified){
          return {
            status: 204,
            message: "Company not verified yet , will notify you once verified by admin.",
            resultSet:{}
          }
        }
        let isPasswordTrue = await bcrypt.compare(password, companyExist.password)
        if(isPasswordTrue){
          return {
            status: 200,
            message: "Authentication successfull.",
            resultSet:companyExist
          }
        }else{
          return {
            status: 204,
            message: "Invalid Password.",
            resultSet:{}
          }
        }
      } else {
        return {
          status: 404,
          message: "Email not registered.",
          resultSet:{}
        }
      }
    } catch (err) {
      console.log('error in companyLogin function >>>', err);
      return {
        status: 500,
        message: err ? (err.message || (err.response && err.response.message)) : "Something went wrong, server error.",
        error: err
      }
    }

  }

  async approveCompany(company_id) {
    try {
      let companyExist = await this.companyRepository.findOne({ _id : company_id })
      if (companyExist) {
        let update_response = await this.companyRepository.updateOne({_id : company_id}, { is_verified : true })
        if(update_response && update_response.modifiedCount){
          return {
            status: 200,
            message: "Company approved.",
          }
        }else{
          return {
            status: 204,
            message: "Company not approved.",
          }
        }
      } else {
        return {
          status: 404,
          message: "Company not found.",
        }
      }
    } catch (err) {
      console.log('error in approveCompany function >>>', err);
      return {
        status: 500,
        message: err ? (err.message || (err.response && err.response.message)) : "Something went wrong, server error.",
        error: err
      }
    }

  }
}
