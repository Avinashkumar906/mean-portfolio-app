import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition( '* => *', [
    query(':enter', 
        [
            style({ position:'absolute', height: '100%', width:'100%', opacity: 0 }),
        ], 
        { optional: true }
    ),

    query(':leave', 
        [
            style({ position:'absolute', height: '100%', width:'100%', opacity: 1 }),
            animate('0.2s', style({ position:'absolute', height: '100%', width:'100%', opacity: 0 }))
        ], 
        { optional: true }
    ),

    query(':enter', 
        [
            style({ position:'absolute', height: '100%', width:'100%', opacity: 0 }),
            animate('0.2s', style({ position:'absolute', height: '100%', width:'100%', opacity: 1 }))
        ], 
        { optional: true }
    )

  ])
])