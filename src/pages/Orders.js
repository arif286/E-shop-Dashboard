import { ColumnDirective, ColumnsDirective, ContextMenu, Edit, ExcelExport, Filter, GridComponent, Inject, Page, PdfExport, Resize, Sort } from '@syncfusion/ej2-react-grids';

import axios from 'axios';
import { useEffect, useState } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
import { Header } from '../components';
import { contextMenuItems, ordersGrid } from '../data/dummy';

const Orders = () => {
  const editing = { allowDeleting: true, allowEditing: true };
    const [orders, setOrders] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
      let isMounted = true;
        axios.get(`${process.env.REACT_APP_API_URL}/api/orders`)
        .then((res) => {
          if (isMounted) {
            setOrders(res.data.data);
          }
        })
        .catch((err) => { console.log(err);})
        .finally(() => {
          isMounted = false
          setLoading(false);
        })
    }, [])

    const override= {
      display: "block",
      margin: "0 auto",
      borderColor: "red",
    };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
     {orders.length? (
       <GridComponent
        id="gridcomp"
        dataSource={orders}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
     ):(
      <div className="flex justify-center">
        <ScaleLoader color="red" loading={loading} cssOverride={override} size={50} />
      </div>
     )}
    </div>
  );
};
export default Orders;
