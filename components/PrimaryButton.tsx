interface PrimaryButtonProps {
  name: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ name }) => {
  return (
    <button className="bg-secondary py-1 px-4 rounded-md text-white">
      {name}
    </button>
  );
};

export default PrimaryButton;
