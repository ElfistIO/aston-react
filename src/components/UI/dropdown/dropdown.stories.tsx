import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { Dropdown } from "./dropdown";

export default {
  component: Dropdown,
  argTypes: {
    list: { Array: "string" },
    color: { type: "string" },
    action: { dispatch: "string" },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => {
  const [sortListBy, setSortListBy] = useState<string>("name");
  return <Dropdown {...args} action={setSortListBy} />;
};

export const SortedBy = Template.bind({});

SortedBy.args = {
  list: ["name", "set", "rarity", "type"],
  color: "brown darken-2",
};
