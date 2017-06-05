import { Ng2Modal, ModalHeader, ModalContent, ModalFooter } from './Modal';
import { RouteModal } from './RouteModal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export * from './Modal';
export * from './RouteModal';

@NgModule({
    imports: [ CommonModule ],
    declarations: [
        Ng2Modal,
        RouteModal,
        ModalHeader,
        ModalContent,
        ModalFooter,
    ],
    exports: [
        Ng2Modal,
        RouteModal,
        ModalHeader,
        ModalContent,
        ModalFooter,
    ],
})
export class ModalModule {}
