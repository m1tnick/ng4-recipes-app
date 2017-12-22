import { Component} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(private dataStorageService: DataStorageService,
        private authService: AuthService) {}

    onSaveData() {
        this.dataStorageService.storeRecipes().
            subscribe(
                (response) => {
                    console.log(response);
                }
            );
    }

    onLogout() {
        this.authService.logout();
    }

    onFetchData() {
        this.dataStorageService.getRecipes();
    }
}