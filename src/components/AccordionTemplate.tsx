import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';

interface AccordionProps {
  question: string; 
  answer: string; 
}

const AccordionTemplate: React.FC<AccordionProps> = ({ question, answer }) => (
  <Accordion.Root className="AccordionRoot" type="single" defaultValue="null" collapsible>
    <Accordion.Item className="AccordionItem" value="item-1">
      <AccordionTrigger>
        <h5> {question}</h5>
      </AccordionTrigger>
      <AccordionContent>
        <p>{answer}</p>
      </AccordionContent>
    </Accordion.Item>
  </Accordion.Root>
);

const AccordionTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger className={classNames('AccordionTrigger', className)} {...props}>
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  );
};

const AccordionContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
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

export default AccordionTemplate;
