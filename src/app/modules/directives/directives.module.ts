import { NgModule } from '@angular/core';
import { AddressonlyDirective } from "./addressonly/addressonly";
import { AlphanumericSpaceDirective } from "./alphanumeric-space/alphanumeric-space";
import { AlphanumbericonlyDirective } from "./alphanumericonly/alphanumericonly";
import { AmountValueDirective } from "./amount-value/amount-value";
import { DecimalsDirective } from './decimals/decimals';
import { LimitToDirective } from "./limit-to/limit-to";
import { MobilnostdDirective } from "./mobilnostd/mobilnostd";
import { NumberonlyDirective } from "./numberonly/numberonly";
import { TextonlyDirective } from "./textonly/textonly";
import { UppercaseDirective } from "./uppercase/uppercase";

@NgModule({
	declarations: [
        LimitToDirective,
		TextonlyDirective,
		NumberonlyDirective,
		AddressonlyDirective,
		AlphanumbericonlyDirective,
		AlphanumericSpaceDirective,
		UppercaseDirective,
		MobilnostdDirective,
		AmountValueDirective,
		DecimalsDirective,
	],
	imports: [],
	exports: [LimitToDirective,
		TextonlyDirective,
		NumberonlyDirective,
		AddressonlyDirective,
		AlphanumbericonlyDirective,
		AlphanumericSpaceDirective,
		UppercaseDirective,
		MobilnostdDirective,
		AmountValueDirective,
		DecimalsDirective,
	]
})
export class DirectivesModule { }
