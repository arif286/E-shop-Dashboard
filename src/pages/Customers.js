import { ColumnDirective, ColumnsDirective, Edit, Filter, GridComponent, Inject, Page, Selection, Sort, Toolbar } from '@syncfusion/ej2-react-grids';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../components';
import { customersGrid } from '../data/dummy';


const Customers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  const [customersList, setCustomersList] = useState([]);

    useEffect(() => {
      let isMounted = true;
        axios.get(`${process.env.REACT_APP_API_URL}/api/customers`)
        .then((res) => {
          if (isMounted) {
            setCustomersList(res.data.data);
          }
        })
        .catch((err) => { console.log(err);})
        .finally(() => { isMounted = false })
    }, [])

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={customersList}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
