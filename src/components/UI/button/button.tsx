interface Color {
  color: string;
}

export const Button = ({ color }: Color) => {
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
