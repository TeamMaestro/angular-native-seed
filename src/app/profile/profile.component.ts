import { Component, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../../shared/github.service';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { Router } from '@angular/router';

@Component({
    selector: 'profile',
    encapsulation: ViewEncapsulation.None,
    providers: [GithubService],
    templateUrl: './profile.template.html'
})
export class ProfileComponent {
    public user = {};
    private profileDialogVisible = false;
    private deleteDialogVisible = false;

    constructor(public githubService: GithubService, private router: Router) {
        githubService.getGithubUser('kirilnn').subscribe(data => {
            this.user = data;
        });
    }

    public onProfileDialogClose() {
        this.profileDialogVisible = false;
    }

    private onSignOutClick() {
        this.router.navigate(['/signin']);
    }

    public onUpdateClick() {
        this.profileDialogVisible = true;
    }

    public onDeleteClick() {
        this.deleteDialogVisible = true;
    }

    public onDeleteDialogClose() {
        this.deleteDialogVisible = false;
    }
}


@NgModule({
    declarations: [ProfileComponent],
    imports: [CommonModule, DialogModule, InputsModule, ButtonsModule]
})

export class ProfileModule {}
