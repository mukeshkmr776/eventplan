import { animate, animateChild, animation, group, query, style, transition, trigger, useAnimation, stagger } from '@angular/animations';


const customAnimation = animation(
  [
    query(':enter',
      [
        style({
          opacity: '{{opacity}}',
          transform: 'scale({{scale}}) translate3d({{x}}, {{y}}, {{z}})'
        }),
        stagger('60ms', animate('{{duration}} {{delay}} cubic-bezier(0.0, 0.0, 0.2, 1)', style('*')))
      ],
      { optional: true }
    )
  ], {
    params: {
      duration: '200ms',
      delay: '0ms',
      opacity: '0',
      scale: '1',
      x: '0',
      y: '0',
      z: '0'
    }
  }
);

export const Animations = [

  trigger('animate', [transition('void => *', [useAnimation(customAnimation)])]),

  trigger('routerTransitionFade', [
    transition('* => *', group([
      query(':enter', [
        style({
          opacity: 0
        })
      ], {
        optional: true
      }),
      query(':leave', [
        style({
          opacity: 1
        }),
        animate('500ms cubic-bezier(0.0, 0.0, 0.2, 1)',
          style({
            opacity: 0
          }))
      ], {
        optional: true
      }),
      query(':enter', [
        style({
          opacity: 0
        }),
        animate('500ms cubic-bezier(0.0, 0.0, 0.2, 1)',
          style({
            opacity: 1
          }))
      ], {
        optional: true
      }),
      query(':enter', animateChild(), {
        optional: true
      }),
      query(':leave', animateChild(), {
        optional: true
      })
    ]))
  ]),

  trigger('myAnimation', [
    transition('* => *', [
      query(':enter', [
        style({
          opacity: 0,
          overflow: 'hidden'
        })
      ], {
        optional: true
      }),
      query(':leave', [
        style({
          opacity: 1
        }),
        animate('300ms cubic-bezier(0.0, 0.0, 0.2, 1)',
          style({
            opacity: 0,
            overflow: 'hidden'
          }))
      ], {
        optional: true
      }),
      query(':enter', [
        style({
          opacity: 0,
          overflow: 'hidden'
        }),
        animate('300ms cubic-bezier(0.0, 0.0, 0.2, 1)',
          style({
            opacity: 1,
            overflow: 'hidden'

          }))
      ], {
        optional: true
      }),
      query(':enter', animateChild(), {
        optional: true
      }),
      query(':leave', animateChild(), {
        optional: true
      })
    ])
  ])
];
