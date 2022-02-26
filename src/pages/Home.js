import React, {useEffect, useState} from "react";
import {Col, Row, Container} from "react-bootstrap";
import Categories from "../components/Categories";
import axios from "axios";
import {API_URL} from "../utils/constants";
import Menus from "../components/Menus";
import swal from "sweetalert";
import Carts from "../components/Carts";

const Home = () => {

    const [menus, setMenus] = useState([])
    const [categorySelect, setCategorySelect] = useState("Makanan")
    const [carts, setCarts] = useState([])

    useEffect(() => {
        axios.get(API_URL + "products?category.nama=" + categorySelect)
            .then((res) => {
                const data = res.data;
                setMenus(data);
            }).catch((err) => {
                console.error(err);
            })
    }, [])

    useEffect(() => {
        getDataCarts(); // get data api keranjangs
    }, [])

    const getDataCarts = () => { // function get data keranjangs
        axios.get(API_URL + "keranjangs")
            .then((res) => {
                const data = res.data;
                setCarts(data);
            }).catch((err) => {
            console.error(err);
        })
    }

    const changeCategory = (value) => { // function untuk get data kategori berdasarkan kategori yang di select
        setCategorySelect(value);
        setMenus([]);

        axios.get(API_URL + "products?category.nama=" + value)
            .then((res) => {
                const data = res.data;
                setMenus(data);
            }).catch((err) => {
                console.error(err);
            })

    }

    const masukKeranjang = (value) => { // function untuk add / edit data kedalam api keranjangs
        axios.get(API_URL + "keranjangs?product.id=" + value.id)
            .then((res) => {
                if(res.data.length === 0) {
                    const data = {
                        jumlah: 1,
                        total_harga: value.harga,
                        product: value
                    };
                    axios.post(API_URL + "keranjangs", data)
                        .then((res) => {
                            swal({
                                title: "Sukses masuk keranjang",
                                text: data.product.nama + " sudah masuk keranjang",
                                icon: "success",
                                button: false,
                                timer: 1500,
                            });
                            getDataCarts();
                        }).catch((err) => {
                            console.log(err);
                    })
                } else {
                    const data = {
                        jumlah: res.data[0].jumlah + 1,
                        total_harga: res.data[0].total_harga + value.harga,
                        product: value
                    };
                    axios.put(API_URL + "keranjangs/" + res.data[0].id, data)
                        .then((res) => {
                            swal( {
                                title: "Sukses masuk keranjang",
                                text: data.product.nama + " sudah masuk keranjang",
                                icon: "success",
                                button: false,
                                timer: 1500,
                            });
                            getDataCarts();
                        }).catch((err) => {
                        console.log(err);
                    })
                }
            }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="mt-3">
            <Container fluid>
                <Row>
                    <Categories changeCategory={changeCategory} categorySelect={categorySelect}/>
                    <Col className="mt-3">
                        <h4>
                            <strong>Daftar Menu</strong>
                        </h4>
                        <hr/>
                        <Row className="overflow-auto menu">
                            {menus &&
                                menus.map((menu) => (
                                    <Menus key={menu.id}
                                           menu={menu}
                                           masukKeranjang={masukKeranjang}
                                    />
                                ))}
                        </Row>
                    </Col>
                   <Carts keranjangs={carts}/>
                </Row>
            </Container>
        </div>
    )
}

export default Home;