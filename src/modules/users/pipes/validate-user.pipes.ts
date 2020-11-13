import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
  } from '@nestjs/common';
  import * as mongoose from 'mongoose';
  import {SignupUserDto} from "../dto/signup-user.dto"
  import {UserSchema} from "../schemas/user.schema"

  @Injectable()
  export class ValidateUser implements PipeTransform<SignupUserDto> {
    async transform(user: SignupUserDto, metadata: ArgumentMetadata) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isEmailValid = re.test(String(user.email).toLowerCase());        
        if (!isEmailValid) {
            throw new BadRequestException({"errors": [
              {
                  "code": 400,
                  "title": "Email Validity Exception",
                  "detail": "Invalid Email."
              }
          ]});
        }   
        
        const isConfirmPwdMatching = (user.password == user.confirmPassword)
        if (!isConfirmPwdMatching) {
          throw new BadRequestException(
            {"errors": [
              {
                  "code": 400,
                  "title": "Confirmation password mismatch Exception",
                  "detail": "Password and confirm password doesnot match"
              }
          ]});
        }
                
      return user         
    }
  }
  