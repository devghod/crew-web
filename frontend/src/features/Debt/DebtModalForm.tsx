import React from "react";
import { object, string, number, date } from 'yup';

let debtSchema = object({
  name: string().required(),
  amount: number().required(),
  due_date: date().required(),
  installment: string().required(),
  interest_rate: number().required(),
  method: string().required()
});

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
    installment: '',
    interest_rate: 0,
    method: ''
  });
  const [ error, setError ] = React.useState({
    status: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await debtSchema
      .validate(form)
      .then((data) => {
        setError({
          status: false,
          message: "",
        });
        addDebt({
          name: form.name,
          amount: form.amount,
          due_date: form.due_date,
          installment: form.installment,
          interest_rate: form.interest_rate,
          method: form.method
        });
        clearForm();
      })
      .catch((error) => {
        setError({
          status: true,
          message: error.errors,
        });
      });
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
      installment: '',
      interest_rate: 0,
      method: ''
    });
  };
  
  return (
    <div className="bg-gray-900 bg-opacity-50 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="w-full bg-white rounded-lg flex flex-col divide-y">
          <h2 className="text-lg font-bold px-4 py-3">Create Form</h2>
          <div
            className={
              error.status ? "bg-red-100 p-4 rounded-lg" : "hidden"
            }
          >
            <p className="text-red-500">{error.message}</p>
          </div>
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
                placeholder="0" 
                type="number"
                value={form.amount} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="text-right p-2">Installment</div>
            <div className="col-span-3">
              <select 
                className="w-full border rounded p-2" 
                name="installment" 
                id="installment"
                value={form.installment} 
                onChange={handleInputChange} 
              >
                <option value="" disabled>Select Installment</option>
                <option value="None">None</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="15 days">15 days</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <div className="text-right p-2">Interest Rate</div>
            <div className="col-span-3">
              <input 
                className="w-full border rounded p-2" 
                name="interest_rate"
                placeholder="0" 
                type="number"
                value={form.interest_rate} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="text-right p-2">Method</div>
            <div className="col-span-3">
              <select 
                className="w-full border rounded p-2" 
                name="method" 
                id="method"
                value={form.method} 
                onChange={handleInputChange} 
              >
                <option value="" disabled>Select Method</option>
                <option value="None">None</option>
                <option value="Full Paid">Full Paid</option>
                <option value="Flat">Flat</option>
                <option value="Diminishing">Diminishing</option>
              </select>
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
