import { Component, ViewEncapsulation, NgModule, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from '../markdown/markdown.component';
import { Http, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { GithubService } from '../../../shared/github.service';
import { IssuesProcessor } from '../../../shared/issues-processor.service';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelClass } from './label.directive';

@Component({
  selector: 'issues',
  encapsulation: ViewEncapsulation.None,
  providers: [
    GithubService,
    IssuesProcessor
  ],
  templateUrl: './issues.template.html'
})
export class IssuesComponent {
    public issues: any;
    public allIssues: any;
    public view: any;
    public total = 5;
    public pageSize = 10;
    public skip = 0;
    public today = new Date();
    public months = 3;
    public range = this.dateRange();

    @HostBinding('attr.id') get get_id() { return "issues"; }
    @HostBinding('class') get get_class() { return "issues"; }

    constructor(public http: Http, public githubService: GithubService, public issuesProcessor: IssuesProcessor) {
        githubService.getGithubIssues({pages: 12}).subscribe((data: any[]) => {
            data = data.reduce((agg, curr) => [...agg, ...curr], []).filter(issue => issue.pull_request ? false : true);
            this.allIssues = data;
            this.applyPaging(this.issuesProcessor.filterByMonth(this.allIssues, this.months))
        });
    }

    onFilterClick(e) {
        this.skip = 0;
        this.months = e;
        this.range = this.dateRange();
        this.applyPaging(this.issuesProcessor.filterByMonth(this.allIssues, e));
    }

    onPageChange(e) {
        this.skip = e.skip;
        this.view = this.getView(e.skip, e.take);
    }

    applyPaging(data) {
        this.issues = data;
        console.log(this.issues[0]);
        this.view = this.getView(this.skip, this.pageSize);
    }

    getView(skip, take) {
        return {
            data: this.issues.slice(skip, skip + take),
            total: this.issues.length
        }
    }

    dateRange() {
        return {
            to: new Date(),
            from: this.issuesProcessor.getMonthsRange(this.months)
        }
    }
}

@NgModule({
    declarations: [IssuesComponent, MarkdownComponent, LabelClass],
    imports: [GridModule, ButtonsModule, CommonModule]
})

export class IssuesModule {}
