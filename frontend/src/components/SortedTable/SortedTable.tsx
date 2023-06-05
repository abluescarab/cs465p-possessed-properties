import "./SortedTable.scss";
import ComponentBase, {
  ComponentBaseProps,
} from "@/components/ComponentBase.tsx";
import React, { useEffect, useState } from "react";
import { compare } from "@/utils.ts";
import Button from "@/components/Button/Button.tsx";

interface SortedTableProps extends ComponentBaseProps {
  data: any;
  columns: {
    name: string;
    label: string;
    display: (item) => React.ReactNode;
    sortFunc?: (item1, item2, descending: boolean) => number;
    sortable?: boolean;
    descendByDefault?: boolean;
  }[];
  buttons?: {
    label: string;
    onClick: (item) => void;
    color: string;
    visible?: (item) => boolean;
  }[];
}

const SortedTable: ComponentBase<SortedTableProps> = ({
  id = "",
  className = "",
  data,
  columns,
  buttons = null,
}) => {
  const [tableData, setTableData] = useState(null);
  const [doSort, setDoSort] = useState(true);
  const [sortedColumn, setSortedColumn] = useState(columns[0]);
  const [descending, setDescending] = useState(
    columns[0].descendByDefault ?? false
  );

  const headerClick = (column) => {
    if (column.sortable === false) {
      return;
    }

    if (sortedColumn.name !== column.name) {
      setDescending(column.descendByDefault);
      setSortedColumn(column);
    } else {
      setDescending(!descending);
    }

    setDoSort(true);
  };

  const displayArrow = (column) => {
    if (column.sortable === false) {
      return null;
    }

    if (sortedColumn.name === column.name) {
      if (descending) {
        return "expand_more";
      } else {
        return "expand_less";
      }
    }

    return "unfold_more";
  };

  useEffect(() => {
    setDoSort(true);
  }, [data]);

  useEffect(() => {
    const sort = (column, descending) => {
      if (column.sortFunc) {
        data.sort((d1, d2) => column.sortFunc(d1, d2, descending));
      } else {
        data.sort((d1, d2) =>
          compare(column.display(d1), column.display(d2), descending)
        );
      }

      setTableData(data);
    };

    if (doSort) {
      sort(sortedColumn, descending);
      setDoSort(false);
    }
  }, [descending, sortedColumn, data, doSort]);

  return (
    <table id={id} className={`sorted-table ${className}`}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.name} onClick={() => headerClick(column)}>
              <div
                className={`table-title ${
                  column.sortable !== false ? "sortable" : ""
                }`}
              >
                <span className={"column-label"}>{column.label}</span>
                <span className={"sort-icon material-symbols-rounded"}>
                  {displayArrow(column)}
                </span>
              </div>
            </th>
          ))}
          {buttons && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {tableData &&
          tableData.map((item) => (
            <tr key={item.id}>
              {columns.map(({ name, display }) => (
                <td key={name}>{display(item)}</td>
              ))}
              {buttons && (
                <td>
                  <div className={"table-buttons"}>
                    {buttons.map((button) => {
                      if (button.visible && !button.visible(item)) {
                        return null;
                      } else {
                        return (
                          <Button
                            type={"button"}
                            key={button.label}
                            onClick={() => button.onClick(item)}
                            color={button.color}
                          >
                            {button.label}
                          </Button>
                        );
                      }
                    })}
                  </div>
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default SortedTable;
