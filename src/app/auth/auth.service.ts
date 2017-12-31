import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
    //token: string;

    constructor(private router: Router, private store: Store<fromApp.AppState>) {}

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
            user => {
                this.store.dispatch(new AuthActions.Signup());
                firebase.auth().currentUser.getToken()
                    .then(
                        (token: string) => {
                            this.store.dispatch(new AuthActions.SetToken(token));
                        }
                    )
            }
        )
        .catch(
            error => console.log(error)
        );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.store.dispatch(new AuthActions.SignIn());
                    this.router.navigate(['/']);
                    firebase.auth().currentUser.getToken()
                        .then(
                            (token: string) => {
                            //this.token = token
                             this.store.dispatch(new AuthActions.SetToken(token));   
                            }
                        )
                }
            )
            .catch(
                error => console.log(error)
            );
    }

    logout() {
        firebase.auth().signOut();
        //this.token = null; 
    }

    // Replaced by the use of store
    // getToken() {
    //     firebase.auth().currentUser.getToken()
    //     .then(
    //         (token: string) => this.token = token
    //     )
    //     return this.token;
    // }

    // isAuthenticated() {
    //     return this.token != null;
    // }
}