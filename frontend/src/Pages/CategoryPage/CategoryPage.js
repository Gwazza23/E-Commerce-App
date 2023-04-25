import React, { useEffect } from "react";
import "./CategoryPage.css";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, selectProducts } from "../../Slices/productsSlice";
import { motion } from 'framer-motion'
import { Link } from "react-router-dom";

export default function CategoryPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const categoryData = useSelector(selectProducts).categoryData;
  console.log(categoryData);

  const tileVariant = {
    hover: {
    }
  }
  const imageVariant = {
    hover: {
        scale: 1.1
    }
  }

  const textVariant = {
    hover: {
        color: '#4DA8DA'
    }
  }

  useEffect(() => {
    dispatch(fetchCategory(id));
  }, [dispatch, id]);

  return (
    <div className="category-page-div">
      <div className="category-page-title">
        <h1>{categoryData[0]?.category_name}</h1>
      </div>
      <div className="category-page-tile-container">
        {categoryData.map((product) => {
            return (
             <Link className="link" to={`/products/${product.id}`}><motion.div className="product-tile" variants={tileVariant} whileHover="hover">
                <div className="product-image">
                    <motion.img src={product.img_url} alt={product.name} width="250px" height="300px" variants={imageVariant} />
                </div>
                <motion.h3 variants={textVariant}>{product.name}</motion.h3>
            </motion.div></Link>)
        })}
      </div>
    </div>
  );
}
