import {Col, ListGroup} from "react-bootstrap";
import {faCheese, faCoffee, faUtensils} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../utils/constants";

const Icon = ({nama}) => { // function untuk get icon berdasarkan nama kategori
    if(nama === "Makanan")
        return <FontAwesomeIcon icon={faUtensils} className="mr-2"/>
    if(nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />
    if(nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="mr-2"/>
    return <FontAwesomeIcon icon={faUtensils} className="mr-2"/>
}

const Categories = ({changeCategory, categorySelect}) => { // function yang menerima props untuk get data kategori berdasarkan props yang dikirim

    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        axios.get(API_URL + "categories")
            .then((res) => {
                const data = res.data;
                setCategories(data);
            }).catch((err) => {
                console.error(err);
            })

    }

    useEffect(() => {
        getCategories();
    },[])

    return (
        <>
            <Col md={2} className="mt-3">
                <h4><strong>Daftar Kategori</strong></h4>
                <hr />
                <ListGroup>
                    {categories && categories.map((category) => (
                        <ListGroup.Item
                            key={category.id}
                            onClick={() => changeCategory(category.nama)}
                            className={categorySelect === category.nama && "category-aktif"}
                            style={{cursor: 'pointer'}}
                        >
                            <h5>
                                <Icon nama={category.nama} /> {category.nama}
                            </h5>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        </>
    )
}

export default Categories;