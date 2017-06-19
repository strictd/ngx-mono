import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from '../../../_shared/ng2-modal';

import { DraggableDirective } from '../draggable/draggable.directive';

import { PdfWysiwyg } from './views/pdf-wysiwyg/pdf-wysiwyg';
import { PdfWysiwygCross } from './views/pdf-wysiwyg-cross/pdf-wysiwyg-cross';
import { PdfWysiwygEllipse } from './views/pdf-wysiwyg-ellipse/pdf-wysiwyg-ellipse';
import { PdfWysiwygForms } from './views/pdf-wysiwyg-forms/pdf-wysiwyg-forms';
import { PdfWysiwygNumCircle } from './views/pdf-wysiwyg-num-circle/pdf-wysiwyg-num-circle';
import { PdfWysiwygLayers } from './views/pdf-wysiwyg-layers/pdf-wysiwyg-layers';
import { PdfWysiwygLine } from './views/pdf-wysiwyg-line/pdf-wysiwyg-line';
import { PdfWysiwygToolbar } from './views/pdf-wysiwyg-toolbar/pdf-wysiwyg-toolbar';
import { PdfWysiwygToolbox } from './views/pdf-wysiwyg-toolbox/pdf-wysiwyg-toolbox';
import { PdfWysiwygToolboxDetails } from './views/pdf-wysiwyg-toolbox-details/pdf-wysiwyg-toolbox-details';
import { PdfWysiwygTextbox, PdfWysiwygToolbarTextbox } from './views/pdf-wysiwyg-textbox/pdf-wysiwyg-textbox';
import { PdfWysiwygTransfer } from './views/pdf-wysiwyg-transfer/pdf-wysiwyg-transfer';
import { PdfWysiwygSave } from './views/pdf-wysiwyg-save/pdf-wysiwyg-save';

import { PdfWysiwygService } from './providers/pdf-wysiwyg-service';
import { ToolUtils } from './providers/tool-utils';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule
  ],
  declarations: [
    DraggableDirective,
    PdfWysiwyg,
    PdfWysiwygForms,
    PdfWysiwygLayers,
    PdfWysiwygTransfer,
    PdfWysiwygToolbar,
    PdfWysiwygToolbarTextbox,
    PdfWysiwygToolbox,
    PdfWysiwygToolboxDetails,
    PdfWysiwygSave,

    PdfWysiwygCross,
    PdfWysiwygEllipse,
    PdfWysiwygLine,
    PdfWysiwygNumCircle,
    PdfWysiwygTextbox
  ],
  exports: [
    PdfWysiwyg,
    PdfWysiwygForms,
    PdfWysiwygLayers,
    PdfWysiwygTransfer,
    PdfWysiwygToolbar,
    PdfWysiwygToolbarTextbox,
    PdfWysiwygToolbox,
    PdfWysiwygToolboxDetails,
    PdfWysiwygSave,

    PdfWysiwygCross,
    PdfWysiwygEllipse,
    PdfWysiwygLine,
    PdfWysiwygNumCircle,
    PdfWysiwygTextbox
  ]
})
export class PdfWysiwygModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PdfWysiwygModule,
      providers: [
        PdfWysiwygService,
        ToolUtils
      ]
    };
  }
}
