interface Props {
  color: string;
}

export const Button = ({ color }: Props) => {
  return (
    <button
      className={`btn waves-effect waves-light ${color}`}
      type="submit"
      name="action"
    >
      Search
    </button>
  );
};
