import React, { ReactNode } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';

interface AccordionProps {
  question: string; // Define the type for the 'question' prop
  answer: string; // Define the type for the 'answer' prop
}

export const AccordionTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger className={classNames('AccordionTrigger', className)} {...props}>
        <h5>{children}</h5>
        <ChevronDownIcon className="AccordionTriggerIcon" />
      </Accordion.Trigger>
    </Accordion.Header>
  );
};

export const AccordionContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Accordion.Content className={classNames('AccordionContent', className)} {...props}>
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  );
};
