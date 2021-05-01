import { Subject } from 'rxjs';

export const TestUnsubscribeOnMethod = (component: any, subscriptionName: string, methodName: string) => {
  const subject = new Subject();

  component[subscriptionName] = subject.subscribe();

  spyOn(component[subscriptionName], 'unsubscribe').and.callFake(() => {
    subject.unsubscribe();
  });

  component[methodName]();

  expect(component[subscriptionName].unsubscribe).toHaveBeenCalled();
};
