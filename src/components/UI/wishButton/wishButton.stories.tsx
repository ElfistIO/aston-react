import { ComponentStory, ComponentMeta } from "@storybook/react";
import { WishButton } from "./wishButton";

export default {
  component: WishButton,
  argTypes: {
    icon: { type: "string" },
    action: (e: React.SyntheticEvent) => {},
  },
} as ComponentMeta<typeof WishButton>;

const Template: ComponentStory<typeof WishButton> = (args) => {
  async function addToWishList(e: React.SyntheticEvent) {
    e.preventDefault();
  }
  return <WishButton {...args} action={addToWishList} />;
};

export const AddToWishList = Template.bind({});

AddToWishList.args = {
  icon: "favorite_border",
};
