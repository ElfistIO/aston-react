interface Props {
  color: string;
  text: string;
}

export const Button = ({ color, text }: Props) => {
  return (
    <button
      className={`btn waves-effect waves-light ${color}`}
      type="submit"
      name="action"
    >
      {text}
    </button>
  );
};
