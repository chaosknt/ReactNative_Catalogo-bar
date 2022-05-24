import { useState } from "react";
import firebase from "../database/firebase";
import { roles } from "../utils/rols";
import { storeData } from "./auth";

export const getUserByEmailFromFirebase = async (userEmail,setUser,user) => {

    let firebaseUser
    let found = false;
    firebase.db.collection("users").onSnapshot( async (querySnapshot) => {
     
      querySnapshot.docs.forEach(async (doc) => {

        const {email, role} = doc.data();   
        
        if(email === userEmail){
            found = true;  
            firebaseUser = {email: userEmail, isLogged:true, role: role}
            setUser({...user, email: userEmail, isLogged:true, role: role})    
        }
                 
      });

      if(!found){

        await firebase.db.collection("users").add({
            email:userEmail,
            role: roles.Cliente
        });
        firebaseUser = {email: userEmail, isLogged:true, role: roles.Cliente}
        setUser({...user, email: userEmail, isLogged:true, role: roles.Cliente})       
        
      }
      storeData(firebaseUser);
     
    });
           
  };
   
