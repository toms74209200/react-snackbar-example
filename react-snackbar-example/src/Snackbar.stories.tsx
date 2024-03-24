import type { Meta, StoryObj } from "@storybook/react";
import { Snackbar, useSnackbar } from "./Snackbar";

const meta = {
  title: "Components/Snackbar",
  component: Snackbar,
  tags: ["autodocs"],
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => {
      const { snackbarRef, showSnackbar } = useSnackbar();
      return (
        <>
          <button
            className="border p-2 w-max"
            onClick={() => showSnackbar("Hello, world!", 3000)}
          >
            show
          </button>
          <Snackbar ref={snackbarRef} />
          <Story />
        </>
      );
    },
  ],
};
