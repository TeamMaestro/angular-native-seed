import { Component, Input } from '@angular/core';
import { IssueTypesComponent } from '../charts/issue-types.component';
import { TypesDistributionComponent } from '../charts/types-distribution.component';
import { ActiveIssuesComponent } from '../charts/active-issues.component';

@Component({
    selector: 'statistics',
    template: `
        <div class="row">
            <div class="col-md-12">
                <active-issues [data]="issues.groupedIssues" [months]="months" [issues]="issues" [closeRate]="issues.closeRate.average" [active]="issues.active"></active-issues>
            </div>
            <div class="col-md-4">
                <issue-types [data]="issues.issueTypes"></issue-types>
            </div>
            <div class="col-md-8">
                <types-distribution [data]="issues.typesDistribution" [months]="months" *ngIf="issues.active.length"></types-distribution>
            </div>
        </div>
    `
})
export class StatisticsComponent {
    @Input() public issues;
    @Input() public months;
}