import { animate, style, transition, trigger } from "@angular/animations";

export const myAnimation = trigger('fadeInOut', [
    transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
    ])
])
