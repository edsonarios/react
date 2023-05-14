
type Props = {
  label?: string;
}

const LoadingPageIndicator = ({ label="Loading..." }: Props) => <div>{label}</div>;

export default LoadingPageIndicator;
