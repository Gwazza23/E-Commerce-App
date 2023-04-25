import React from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useEffect } from "react";
import {
  fetchAllCategories,
  fetchAllProducts,
  selectProducts,
} from "../../Slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { boxContainerVariant, containerVariant } from "./variants";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const dispatch = useDispatch();
  const ref = useRef();
  const isInView = useInView(ref);

  const productData = useSelector(selectProducts).productData;
  const categoryData = useSelector(selectProducts).categoriesData;

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <div className="homepage">
      <div className="homepage-banner">
        <h2>Street Smart - Fashion Forward</h2>
      </div>

      <motion.div
        className="scroll-down-prompt"
        animate={{ opacity: isInView ? 0 : 1, transition: { duration: 0.7 } }}
      >
        <p>Scroll Down</p>
      </motion.div>

      <div ref={ref} className="break"></div>

      <motion.div
        variants={boxContainerVariant}
        initial="hidden"
        whileInView="visible"
        className="trending"
      >
        <motion.h2
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 1 }}
        >
          POPULAR
        </motion.h2>
        <motion.div
          className="tile-container"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
        >
          {productData &&
            productData.slice(0, 3).map((tile) => {
              return (
                <div className="tile-wrap" key={tile.id}>
                  <Link to={`/products/${tile.id}`}>
                    <motion.div className="tiles">
                      <motion.img
                        src={tile.img_url}
                        alt={tile.name}
                        width="400px"
                        height="450px"
                        whileHover={{
                          scale: 1.1,
                          transition: { ease: "easeInOut" },
                        }}
                      />
                    </motion.div>
                  </Link>
                  <h3>{tile.name}</h3>
                </div>
              );
            })}
        </motion.div>
      </motion.div>

      <motion.div
        variants={boxContainerVariant}
        initial="hidden"
        whileInView="visible"
        className="categories"
      >
        <motion.h2>CATEGORIES</motion.h2>
        <div className="category-tiles">
          {categoryData &&
            categoryData.map((tile) => {
              return (
                <div className="category" key={tile.id}>
                  <Link
                    className="link"
                    to={`category/${tile.id}`}
                    style={{ color: "White" }}
                  >
                    <motion.h3 whileHover={{ scale: 1.3, color: "#4DA8DA" }}>
                      {tile.category_name}
                    </motion.h3>
                  </Link>
                </div>
              );
            })}
        </div>
      </motion.div>
    </div>
  );
}
