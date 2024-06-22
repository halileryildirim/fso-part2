const PersonForm = ({ onSubmit, name, number, editName, editNumber }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={editName} />
      </div>
      <div>
        number: <input value={number} onChange={editNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
