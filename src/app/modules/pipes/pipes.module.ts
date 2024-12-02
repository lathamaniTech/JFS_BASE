import { NgModule } from '@angular/core';
import { BranchPipe } from './branch/branch';
import { OtherdocmapPipe } from './otherdocmap/otherdocmap';
import { PddsubmissionmapPipe } from './pddsubmissionmap/pddsubmissionmap';

@NgModule({
	declarations: [
        OtherdocmapPipe,
        BranchPipe,
        PddsubmissionmapPipe
    ],
	imports: [],
	exports: [
        OtherdocmapPipe,
        BranchPipe,
        PddsubmissionmapPipe
    ]
})
export class PipesModule {}