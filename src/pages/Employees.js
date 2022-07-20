import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Page, Search } from '@syncfusion/ej2-react-grids';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../components';
import { employeesGrid } from '../data/dummy';

const Employees = () => {
  const toolbarOptions = ['Search'];

  const editing = { allowDeleting: true, allowEditing: true };
  const [employeesList, setEmployeesList] = useState([]);

    useEffect(() => {
      let isMounted = true;
        axios.get(`${process.env.REACT_APP_API_URL}/api/employees`)
        .then((res) => {
          if (isMounted) {
            setEmployeesList(res.data.data);
          }
        })
        .catch((err) => { console.log(err);})
        .finally(() => { isMounted = false })
    }, [])

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
      <GridComponent
        dataSource={employeesList}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />

      </GridComponent>
    </div>
  );
};
export default Employees;
