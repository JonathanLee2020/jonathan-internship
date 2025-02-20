import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
      async function fetchData() {
        await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        ).then((response) => {
          setData(response.data);
          setLoading(false);
        }).catch((error) => {
          console.log(error)
        })
      }
      fetchData();
    }, []);
  return (
    <section id="section-popular" className="pb-5">
      <div className="container" >
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-in" 
              data-aos-once="true"
              data-aos-duration="800">Top Sellers</h2>
              <div className="small-border bg-color-2" ></div>
            </div>
          </div>
          <div className="col-md-12" data-aos="fade-in" 
              data-aos-delay="200"
              data-aos-once="true"
              data-aos-duration="800">
            <ol className="author_list">
            {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <div className="skeleton-box" style={{width: "50px", height: "50px", borderRadius: "100%"}}></div>
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author" className="skeleton-box" style={{width: "100px", height: "20px"}}></Link>
                        <span className="skeleton-box" style={{color: "#dddbdd", width: "40px", height: "20px"}}>2.1 ETH</span>
                      </div>
                    </li>
                  ))
                : data.map((element) => (
                    <li key={element.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${element.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={element.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to = {`/author/${element.authorId}`} >{element.authorName}</Link>
                        <span>{element.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
