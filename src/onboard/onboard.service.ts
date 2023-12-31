import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto'
import { LoginDto } from './dto/login.dto';
import { User } from './schemas/onboard.schema';
import { OnboardRepository } from './onboard.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OnboardService {
  constructor(private readonly onboardRepository: OnboardRepository) { }

  async signup(signupdata: SignupDto) {
    let { fullname, email, password, mobile_no, linkedin_link } = signupdata
    try {
      let emailExist = await this.onboardRepository.findOne({ email})
      if(emailExist){
        return{
              status:204,
              message:"Email already registered.",
              resultSet:[]
            }
      }
      let mobileNoExist = await this.onboardRepository.findOne({mobile_no})
      if(mobileNoExist){
        return{
              status:204,
              message:"Mobile number already registered.",
              resultSet:[]
            }
      }
      
      password = password && await bcrypt.hash(password, 10);
      let newUser = await this.onboardRepository.create({
        fullname,
        email,
        password,
        mobile_no,
        linkedin_link
      })
      if(newUser){
        return{
          status:200,
          message:"Successfully registered the user.",
          resultSet:newUser
        }
      }
    } catch (err) {
      console.log("error in signup function >>>", err);
      return {
        status: 500,
        message: err ? (err.message || (err.response && err.response.message)) : "Something went wrong, server error.",
        error: err
      }

    }
  }

  async login(logindata: LoginDto) {
    let { email, password } = logindata

    try {
      let userExist = await this.onboardRepository.findOne({ email })
      if (userExist) {
        let isPasswordTrue = await bcrypt.compare(password, userExist.password)
        if(isPasswordTrue){
          return {
            status: 200,
            message: "Authentication successfull.",
            resultSet:userExist
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
      console.log('error in login function >>>', err);
      return {
        status: 500,
        message: err ? (err.message || (err.response && err.response.message)) : "Something went wrong, server error.",
        error: err
      }
    }

  }
}
