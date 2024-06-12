import React from "react";

export type DebtModalForm = {
  close: () => void;
  addDebt: (data: any) => void;
};

const DebtModalForm: React.FC<DebtModalForm> = (props) => {

  const { close, addDebt } = props;
  const [ form, setForm ] = React.useState({
    name: '',
    amount: 0,
    due_date: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addDebt({
      name: form.name,
      amount: form.amount,
      due_date: form.due_date,
    });
    clearForm();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const clearForm = () => {
    setForm({
      name: '',
      amount: 0,
      due_date: '',
    });
  };
  
  return (
    <div className="bg-gray-900 bg-opacity-50 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="w-full bg-white rounded-lg flex flex-col divide-y">
          <h2 className="text-lg font-bold px-4 py-3">Create Form</h2>
          <div className="grid grid-cols-4 gap-4 p-4">
            <div className="text-right p-2">Name</div>
            <div className="col-span-3">
              <input 
                className="w-full border rounded p-2" 
                name="name"
                placeholder="Name here" 
                value={form.name} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="text-right p-2">Amount</div>
            <div className="col-span-3">
              <input 
                className="w-full border rounded p-2" 
                name="amount"
                placeholder="00" 
                type="number"
                value={form.amount} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="text-right p-2">Due Date</div>
            <div className="col-span-3">
              <input 
                className="w-full border rounded p-2" 
                name="due_date"
                placeholder="MM/DD/YYYY" 
                type="date"
                value={form.due_date} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
          <div className="px-4 py-3 flex gap-x-2">
            <button 
              className="p-2 bg-sky-500 hover:bg-sky-700 rounded text-white"
              onClick={handleSubmit}
            >
              Create
            </button>
            <button 
              className="p-2 bg-red-500 hover:bg-red-700 rounded text-white"
              type="button"
              onClick={close}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default DebtModalForm;
