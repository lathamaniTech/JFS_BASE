import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { StatusComponent } from "src/app/components/status/status.component";
import { ExpandableComponent } from "src/app/components/expandable/expandable.component";
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
    declarations: [
        StatusComponent,
        ExpandableComponent
    ],
    imports: [
        CommonModule, 
        IonicModule, 
        FormsModule, 
        ReactiveFormsModule, 
        DirectivesModule,
        PipesModule
    ],
    exports: [
        StatusComponent,
        ExpandableComponent,
        DirectivesModule,
        PipesModule
    ]
})

export class SharedModule { }