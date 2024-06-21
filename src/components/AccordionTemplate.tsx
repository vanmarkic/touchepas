import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import styled from 'styled-components';

interface AccordionProps {
  question: string;
  answer: string;
}

const StyledAccordionContent = styled(Accordion.Content)`
  overflow: hidden;
  color: black;
  font-size: 16px;
`;
const StyledH5 = styled.h5`
  text-align: left;
`;

export const AccordionTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger className={classNames('AccordionTrigger', className)} {...props}>
        <StyledH5>{children}</StyledH5>
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
    <StyledAccordionContent>
      <div className="AccordionContentText">{children}</div>
    </StyledAccordionContent>
  );
};
