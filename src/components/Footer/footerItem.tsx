import { Link } from "react-router-dom";

interface Props {
  link: string;
  text: string;
}

export const FooterItem = ({ link, text }: Props) => {
  return (
    <li>
      <Link to={`/${link}`} className="grey-text text-lighten-3">
        {text}
      </Link>
    </li>
  );
};
