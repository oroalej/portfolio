"use client";

import { CardBody, CardFooter, CardHeader, CardRoot, CardTitle } from "./Card";

const Card = CardRoot as typeof CardRoot & {
  Title: typeof CardTitle;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Header: typeof CardHeader;
};

Card.Title = CardTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Header = CardHeader;

export { Card, CardHeader, CardBody, CardFooter, CardTitle, CardRoot };
