import React from "react";
import { object, string, number, date } from 'yup';
import { dateFormat } from '../../utils/dateHelper';

let debtSchema = object({
  name: string().required(),
  amount: number().required(),
  due_date: date().required(),
  installment: string().required(),
  interest_rate: number().required(),
  method: string().required()
});

export type DebtModalFormCreate = {
  isLoading: boolean;
  close: () => void;
  addDebt: (data: any) => void;
};

const DebtModalFormCreate: React.FC<DebtModalFormCreate> = (props) => {

  const { close, addDebt, isLoading } = props;
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
      .then(async (data) => {
        setError({
          status: false,
          message: "",
        });
        await addDebt({
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
              disabled={isLoading}
            >
              {
                isLoading ? 
                (
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-300 animate-spin dark:text-gray-300 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>  
                ) : 
                'Create'
              }
            </button>
            <button 
              className="p-2 bg-red-500 hover:bg-red-700 rounded text-white"
              type="button"
              onClick={close}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default DebtModalFormCreate;
