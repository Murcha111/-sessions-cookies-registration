import axios from "axios";
import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import DataRow from "./DataRow";
import style from "./style.module.css"
export default function DataTable() {
  const titles = [
    "Название",
    "Статус",
    "Ответственный",
    "Дата Создания",
    "Бюджет",
  ];

  useEffect(() => {
    const getData = async () => {
      axios.get("http://localhost:3001/api/leads");
    };
  }, []);

  return (
    <div className={style.tableWrap}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            {titles.map((title) => (
              <td>{title}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          <DataRow />
        </tbody>
      </Table>
    </div>
  );
}
