interface SecondaryButtonProps {
  name: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ name }) => {
  return (
    <button className="bg-warning py-1 px-4 rounded-md text-white">
      {name}
    </button>
  );
};

export default SecondaryButton;
