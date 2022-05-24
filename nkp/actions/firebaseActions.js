import { useState } from "react";
import firebase from "../database/firebase";
import { roles } from "../utils/rols";
import { storeData } from "./auth";

export const getUserByEmail = async (userLogged) => {
        
    let firebaseUser = userLogged;
    let found = false;
    firebase.db.collection("users").onSnapshot( async (querySnapshot) => {
     
      querySnapshot.docs.forEach(async (doc) => {

        const {email, role} = doc.data();   
        
        if(email === userLogged.email){
            firebaseUser.role = role;
            found = true;            
        }
                 
      });

      if(!found){

        await firebase.db.collection("users").add({
            email: userLogged.email,
            role: roles.Cliente
        });
        firebaseUser.role = roles.Cliente;
      }
      storeData(firebaseUser);
      found = false;
    });
           
  };
   
