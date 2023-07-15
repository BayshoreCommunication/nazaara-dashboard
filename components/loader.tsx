import { ScaleLoader } from "react-spinners";

interface Props {
  height: string;
}

const Loader: React.FC<Props> = ({ height }) => {
  return (
    <div className={`flex justify-center items-center w-full ${height}`}>
      <ScaleLoader color="#820000" margin={5} speedMultiplier={1.5} width={5} />
    </div>
  );
};

export default Loader;
