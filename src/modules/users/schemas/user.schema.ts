import * as mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    gender: {
      type: String,
      enum : ['MALE','FEMALE', 'OTHERS']
    },
    phoneNumber: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      unique: true
    },
    dob: {
      type: Date,
      trim: true
    }, 
    linkedinUrl: {
      type: String,
      trim: true,
      maxlength: 100,
    },       
    twitterUrl: {
      type: String,
      trim: true,
      maxlength: 100,
    },           
    address: {
      type: String,
      trim: true,
      maxlength: 200,
    },            
    organization: {
      type: String,
      trim: true,
      maxlength: 200,
    },                  
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
    },             
    notificationPref: {
      type: Boolean,
    },       
    status: {
      type: String,
      required: true,
      enum : ['ACTIVE','DISABLED', 'BLOCKED', 'DELETED'],
      default: 'ACTIVE'
    },                         
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,        
      },
    confirmationToken:{
      type: String,
      unique: true,
      trim: true,
      maxlength: 50,   
      required: true,
      default: uuidv4()      
    },    
    isConfirmed:{
      type: Boolean,
      required: true,
      default: false
    },
    forgetToken:{
      type: String,
      trim: true,
      maxlength: 50,              
    },       
  },
  { timestamps: true },
);