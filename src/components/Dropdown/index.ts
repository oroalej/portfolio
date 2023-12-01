"use client";

import {
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownRoot,
  DropdownTrigger,
} from "./Dropdown";

const Dropdown = DropdownRoot as typeof DropdownRoot & {
  Content: typeof DropdownContent;
  Trigger: typeof DropdownTrigger;
  Item: typeof DropdownItem;
  Group: typeof DropdownGroup;
};

Dropdown.Content = DropdownContent;
Dropdown.Trigger = DropdownTrigger;
Dropdown.Item = DropdownItem;
Dropdown.Group = DropdownGroup;

export {
  Dropdown,
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownRoot,
  DropdownTrigger,
};
