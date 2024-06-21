const Total = ({ parts }) => {
  let total = 0;
  parts.map((part) => {
    total += part.exercises;
  });

  return (
    <p>
      <strong>total of {total} exercises </strong>
    </p>
  );
};

export default Total;
