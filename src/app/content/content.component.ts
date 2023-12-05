import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

enum Steps {
    START,
    NALOG,
    BUH,
    INFO
}

@Component({
    selector: 'app-content',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './content.component.html',
    styleUrl: './content.component.scss'
})
export class ContentComponent {

    constructor(private dataService: DataService) { }

    Steps = Steps;

    dataList: Array<any> = [];
    nalogList: Array<any> = [];
    buhList: Array<any> = [];

    selectedProgram: any | null = null;
    nameCompany: string = "";
    currentStep: Steps = Steps.START;

    showBack: boolean = false;

    ngOnInit() {

        this.dataService.getData().subscribe((data) => {
            this.dataList = data.society;
        });
    }

    showNalogList() {

        // this.nalogList = this.dataList.map(item => ({ name: item.name, type: 'nalog' }));
        this.nalogList = this.dataList;

        this.buhList = []; // Сбросить бухучет
        this.selectedProgram = null;

        this.currentStep = Steps.NALOG;
    }

    showBuhList() {

        // this.buhList = this.dataList.map(item => ({ name: item.name, type: 'buh' }));
        this.buhList = this.dataList;

        this.nalogList = []; // Сбросить налоги
        this.selectedProgram = null;

        this.currentStep = Steps.BUH;
    }

    showProgram(programName: string, programType: string) {

        const company = this.dataList.find(item => item.name === programName);

        if (company) this.selectedProgram = company[programType];

        this.nameCompany = programName;
        this.currentStep = Steps.INFO;
    }

    back() {

        if (this.currentStep === Steps.NALOG || this.currentStep === Steps.BUH) {

            this.currentStep = Steps.START; // Вернуться к начальному этапу
        }
        else if (this.currentStep === Steps.INFO) {

            if (this.nalogList.length > 0) {

                this.currentStep = Steps.NALOG; // Вернуться к этапу "назад"
            }
            else if (this.buhList.length > 0) {

                this.currentStep = Steps.BUH; // Вернуться к этапу "бухучет"
            }
        }
    }

}
