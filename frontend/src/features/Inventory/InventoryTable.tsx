import React from "react";

export type InventoryTable = {};

const InventoryTable: React.FC<InventoryTable> = (props) => {
  
  return (
    <div className="rounded container bg-white py-2 px-4">
      <div className="my-4">
        <table className="w-full table-auto border-collapse border border-slate-100">
          <thead>
            <tr className="text-left text-slate-400 text-xs">
              <th className="w-16 p-2"></th>
              <th className="w-52 p-2">Product</th>
              <th className="p-2">Stocks</th>
              <th className="p-2">Category</th>
              <th className="p-2">Type</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          {datas.length > 0 && 
            (
              <tbody>
                {datas.map((data, index) => (
                  <tr key={index} className="text-left text-slate-700 text-xs font-medium">
                    <td className="border-y border-slate-100 p-2">
                      <img className="mx-auto" src={data.product_thumbnail} width="16" />
                    </td>
                    <td className="border-y border-slate-100 p-2">{data.product_name}</td>
                    <td className="border-y border-slate-100 p-2">{data.product_stocks}</td>
                    <td className="border-y border-slate-100 p-2">{data.product_category}</td>
                    <td className="border-y border-slate-100 p-2">{data.product_type}</td>
                    <td className="border-y border-slate-100 p-2">{data.product_status}</td>
                    <td className="border-y border-slate-100 p-2">
                      <button className="text-gray-400 rounded hover:bg-gray-100 p-1">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )
          }
          {/* {(datas.length === 0) && 
            (<div className="border-b border-x border-slate-100 p-2 text-center text-sm text-slate-400 font-semibold">No data</div>)
          } */}
        </table>
      </div>
    </div>
  )
};

export default InventoryTable;

const datas = [
  {
    id: 1,
    product_images: [],
    product_thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
    product_name: "Product 1 Product 1 Product 1 Product 1",
    product_description: "",
    product_price: 10.00,
    product_category: "Category 1",
    product_type: "Type 1",
    product_status: "Active",
    product_stocks: 100,
  },
  {
    id: 2,
    product_images: [],
    product_thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
    product_name: "Product 2",
    product_description: "",
    product_price: 10.00,
    product_category: "Category 2",
    product_type: "Type 2",
    product_status: "Active",
    product_stocks: 200,
  },
];