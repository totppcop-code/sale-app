import React, { useState, useEffect } from "react";
import axios from "axios";

function ShopApp() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  // 初始化：從後端抓商品清單
  useEffect(() => {
    axios.get("http://localhost/api/sales/")
      .then(res => setItems(res.data))
      .catch(err => console.error("API 錯誤:", err));
  }, []);

  // 新增商品 → 呼叫後端 API
  const addItem = () => {
    if (!name || !price || !desc || !date) {
      alert("請完整輸入商品資訊！");
      return;
    }

    axios.post("http://localhost/api/sales/", {
      name: name,
      price: parseFloat(price),
      description: desc,
      date: date
    })
    .then(res => {
      setItems([...items, res.data]); // 後端回傳的商品
      setName("");
      setPrice("");
      setDesc("");
      setDate("");
    })
    .catch(err => console.error("新增失敗:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>購物網前端範例 (API 連接)</h1>

      <h2>新增商品</h2>
      <input
        type="text"
        placeholder="商品名稱"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="商品價格"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="商品描述"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={addItem}>新增</button>

      <h2>商品清單</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {items.map(item => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              margin: "10px",
              width: "220px"
            }}
          >
            <h3>{item.name}</h3>
            <p>價格: ${Number(item.price).toFixed(2)}</p>
            <p>描述: {item.description}</p>
            <p>日期: {item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopApp;
