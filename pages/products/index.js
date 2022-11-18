import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/ProductDashboard.module.css";
import { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(null); //"Food", "Technology"

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = categoryFilter
          ? `/api/products?category=${categoryFilter}`
          : "/api/products";
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          throw new Error(
            `Fetch fehlgeschlagen mit Status: ${response.status}`
          );
        }
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    };
    getProducts();
  }, [categoryFilter]);

  async function deleteProduct(idToDelete) {
    try {
      const url = `/api/products/` + idToDelete;

      const response = await fetch(url, { method: "DELETE" });
      if (response.ok) {
        const data = await response.json();
        setProducts(products.filter((product) => product._id !== data._id));
      } else {
        throw new Error(`Fetch fehlgeschlagen mit Status: ${response.status}`);
      }
    } catch (error) {
      console.log(errorr);
      alert(error.message);
    }
  }

  async function addProduct() {
    try {
      const url = `/api/products/` + idToDelete;

      const response = await fetch(url, { method: "POST" });
      if (response.ok) {
        const data = await response.json();
        setProducts(products.filter((product) => product._id !== data._id));
      } else {
        throw new Error(`Fetch fehlgeschlagen mit Status: ${response.status}`);
      }
    } catch (error) {
      console.log(errorr);
      alert(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Product Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="test">Products Dashboard</h1>
        <select
          onChange={(event) => {
            if (event.target.value === "all") {
              setCategoryFilter(null);
            } else {
              setCategoryFilter(event.target.value);
            }
          }}
        >
          <option value="all">Alle</option>
          <option value="Food">Food</option>
          <option value="Technology">Technology</option>
        </select>
        <p>{categoryFilter}</p>
        <ul className={styles["product-list"]}>
          {products.map((product) => {
            return (
              <li key={product._id}>
                <Link href={`/products/${product._id}`}>{product.name}</Link>
                <button onClick={() => deleteProduct(product._id)}>
                  Löschen
                </button>
              </li>
            );
          })}
        </ul>
        <>
          <form>
            <label htmlFor="Product">Product</label>
            <input id="name" type="text" required />
            <br />
            <label htmlFor="category">Category</label>
            <input id="category" type="text" required />
            <br />
            <label htmlFor="detail">Detail</label>
            <input id="detail" type="text" required />
            <br />
            <button>Submit</button>
          </form>
        </>
      </div>
    </>
  );
};

export default Products;
