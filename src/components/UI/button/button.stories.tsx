import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "./button";

export default {
  component: Button,
  argTypes: {
    color: { type: "string" },
    text: { type: "string" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Search = Template.bind({});

Search.args = {
  color: "brown darken-3",
  text: "Search",
};
