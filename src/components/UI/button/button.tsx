interface Props {
  color: string;
  text: string;
}

export const Button = (props: Props) => {
  return (
    <button
      className={`btn waves-effect waves-light ${props.color}`}
      type="submit"
      name="action"
    >
      {props.text}
    </button>
  );
};
