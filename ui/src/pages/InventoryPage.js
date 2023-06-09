import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@mui/material";

import FilterFields from "../components/FilterFields";
import FilterChips from "../components/FilterChips";
import LaptopTable from "../components/LaptopTable";
import LaptopDetailModal from "../components/LaptopDetailModal";
import { bearerTokenConfig } from "../util/helpers";


const InventoryPage = () => {
  const [allLaptops, setAllLaptops] = useState([]);
  const [filteredLaptops, setFilteredLaptops] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    manufacturer: "",
    status: "",
    donated_by: "",
    screen_size: "",
    memory: "",
    disk_size: "",
    laptop_condition: "",
    charger_included: "",
  });
  const [options, setOptions] = useState({
    manufacturer: [],
    status: [],
    donated_by: [],
    screen_size: [],
    memory: [],
    disk_size: [],
    laptop_condition: [],
    charger_included: [0,1],
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalLaptopData] = useState({
    serial: "",
    manufacturer: "",
    laptop_id: "",
    status: "UNPROCESSED",
    donated_by: "",
    date_donated: "",
    model: "",
    screen_size: "",
    cpu_type: "",
    memory: "",
    disk_size: "",
    laptop_condition: "",
    charger_type: "",
    charger_included: false,
    value: "",
    list_price: "",
    sold_price: "",
    notes: "",
  });

  useEffect(() => {
      axios.get(
        "http://localhost:3001/inventory", 
        bearerTokenConfig
      ).then((response) => {
        setAllLaptops(response.data);
      }).catch((err) => {
        console.error("Failed to load inventory");
      });
  }, []);
  
  useEffect(() => {
    // Loop through laptops and populate options dropdowns
  
    setOptions(prevOptions=>{
      const opts ={...prevOptions}
      allLaptops.forEach((laptop) => {
        if (laptop.manufacturer && opts.manufacturer.indexOf(laptop.manufacturer) === -1)
          opts.manufacturer.push(laptop.manufacturer);
        if (laptop.status && opts.status.indexOf(laptop.status) === -1)
          opts.status.push(laptop.status);
        if (laptop.donated_by && opts.donated_by.indexOf(laptop.donated_by) === -1)
          opts.donated_by.push(laptop.donated_by);
        if (laptop.screen_size && opts.screen_size.indexOf(laptop.screen_size) === -1)
          opts.screen_size.push(laptop.screen_size);
        if (laptop.memory && opts.memory.indexOf(laptop.memory) === -1)
          opts.memory.push(laptop.memory);
        if (laptop.disk_size && opts.disk_size.indexOf(laptop.disk_size) === -1)
          opts.disk_size.push(laptop.disk_size);
        if (laptop.laptop_condition && opts.laptop_condition.indexOf(laptop.laptop_condition) === -1) 
          opts.laptop_condition.push(laptop.laptop_condition);
        //if (opts.charger_included.indexOf(laptop.charger_included) === -1) opts.charger_included.push(laptop.charger_included);
      });

      for (const key in opts) {
        opts[key].sort();
      }

      return opts
    });
  }, [allLaptops]);

  useEffect(() => {
    let newList = [...allLaptops];
    if (filters.search) {
      newList = newList.filter((laptop) =>
        searchCheck(laptop, filters.search.toLowerCase())
      );
    }
    if (filters.manufacturer) {
      newList = newList.filter(
        (laptop) => laptop.manufacturer === filters.manufacturer
      );
    }
    if (filters.status) {
      newList = newList.filter((laptop) => laptop.status === filters.status);
    }
    if (filters.donated_by) {
      newList = newList.filter(
        (laptop) => laptop.donated_by === filters.donated_by
      );
    }
    if (filters.screen_size) {
      newList = newList.filter(
        (laptop) => laptop.screen_size === filters.screen_size
      );
    }
    if (filters.memory) {
      newList = newList.filter((laptop) => laptop.memory === filters.memory);
    }
    if (filters.disk_size) {
      newList = newList.filter(
        (laptop) => laptop.disk_size === filters.disk_size
      );
    }
    if (filters.laptop_condition) {
      newList = newList.filter(
        (laptop) => laptop.laptop_condition === filters.laptop_condition
      );
    }
    if (filters.charger_included) {
      if (filters.charger_included === "Yes") {
        newList = newList.filter((laptop) => laptop.charger_included);
      } else if (filters.charger_included === "No") {
        newList = newList.filter((laptop) => !laptop.charger_included);
      }
    }
    setFilteredLaptops(newList);
  }, [allLaptops, filters, filters.search]);

  function searchCheck(laptop, text) {
    if (laptop.serial?.toLowerCase().includes(text)) return true;
    if (laptop.manufacturer?.toLowerCase().includes(text)) return true;
    if (laptop.laptop_id?.toLowerCase().includes(text)) return true;
    if (laptop.status?.toLowerCase().includes(text)) return true;
    if (laptop.donated_by?.toLowerCase().includes(text)) return true;
    if (laptop.date_donated?.toLowerCase().includes(text)) return true;
    if (laptop.model?.toLowerCase().includes(text)) return true;
    if (laptop.screen_size?.toLowerCase().includes(text)) return true;
    if (laptop.cpu_type?.toLowerCase().includes(text)) return true;
    if (laptop.memory?.toLowerCase().includes(text)) return true;
    if (laptop.disk_size?.toLowerCase().includes(text)) return true;
    if (laptop.laptop_condition?.toLowerCase().includes(text)) return true;
    if (laptop.charger_type?.toLowerCase().includes(text)) return true;
    if (laptop.notes?.toLowerCase().includes(text)) return true;
    return false;
  }

  function openModal(targetId) {
    setModalLaptopData(
      allLaptops.find((laptop) => laptop.id === targetId)
    );
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setModalLaptopData({
      serial: "",
      manufacturer: "",
      laptop_id: "",
      status: "UNPROCESSED",
      donated_by: "",
      date_donated: "",
      model: "",
      screen_size: "",
      cpu_type: "",
      memory: "",
      disk_size: "",
      laptop_condition: "",
      charger_type: "",
      charger_included: false,
      value: "",
      list_price: "",
      sold_price: "",
      notes: "",
    });
  }

  function exportData() {
    const csvContent = [
      [
        "Serial",
        "Manufacturer",
        "Laptop ID",
        "Status",
        "Donated By",
        "Date Donated",
        "Model",
        "Screen Size",
        "CPU Type",
        "Memory",
        "Disk Size",
        "Condition",
        "Charger Type",
        "Charger Included",
        "Trade-In Value",
        "List Price",
        "Sold Price",
        "Notes",
      ],
      ...filteredLaptops.map((laptop) => [
        `"${laptop.serial?.replace(`"`, `""`)}"`,
        `"${laptop.manufacturer?.replace(`"`, `""`)}"`,
        `"${laptop.laptop_id?.replace(`"`, `""`)}"`,
        `"${laptop.status?.replace(`"`, `""`)}"`,
        `"${laptop.donated_by?.replace(`"`, `""`)}"`,
        `"${laptop.date_donated?.replace(`"`, `""`)}"`,
        `"${laptop.model?.replace(`"`, `""`)}"`,
        `"${laptop.screen_size?.replace(`"`, `""`)}"`,
        `"${laptop.cpu_type?.replace(`"`, `""`)}"`,
        `"${laptop.memory?.replace(`"`, `""`)}"`,
        `"${laptop.disk_size?.replace(`"`, `""`)}"`,
        `"${laptop.laptop_condition?.replace(`"`, `""`)}"`,
        `"${laptop.charger_type?.replace(`"`, `""`)}"`,
        `"${laptop.charger_included}"`,
        `"${laptop.trade_in_value}"`,
        `"${laptop.list_price}"`,
        `"${laptop.sold_price}"`,
        `"${laptop.notes?.replace(`"`, `""`)}"`,
      ]),
    ]
      .map((item) => item.join(","))
      .join("\n");

    let downloadLink = document.createElement("a");
    downloadLink.href = "data:text/csv;charset=utf-8," + encodeURI(csvContent);
    downloadLink.target = "_blank";
    downloadLink.download = "filtered_laptop_inventory.csv";
    downloadLink.click();
  }

  return (
    <>
      <Container sx={{ maxWidth: "1220px", margin: "24px auto 0;" }}>
        <FilterFields
          filters={filters}
          setFilters={setFilters}
          options={options}
        />
        <FilterChips filters={filters} setFilters={setFilters} />
        <LaptopTable
          laptops={filteredLaptops}
          filtered={allLaptops.length !== filteredLaptops.length}
          openModal={openModal}
          exportData={exportData}
        />
      </Container>

      <LaptopDetailModal
        open={modalOpen}
        close={closeModal}
        laptop={modalData}
      />
    </>
  );
};
export default InventoryPage;
