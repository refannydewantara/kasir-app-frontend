import {Badge, Card, Col, ListGroup, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import ModalCart from "./ModalCart";
import {API_URL} from "../utils/constants";
import swal from "sweetalert";
import axios from "axios";

const Carts = ({keranjangs}) => {

    const [showModal, setShowModal] = useState(false);
    const [cartDetail, setCartDetail] = useState(false);
    const [jumlah, setJumlah] = useState(0);
    const [keterangan, setKeterangan] = useState("");
    const [totalHarga, setTotalHarga] = useState(0);
    const [carts, setCarts] = useState([]);


    useEffect(() => {
        if(keranjangs) {
            setCarts(keranjangs)
        }
    }, [keranjangs])

    const getDataCarts = () => { //function untuk get data api keranjangs
        axios.get(API_URL + "keranjangs")
            .then((res) => {
                const data = res.data;
                setCarts(data);
            }).catch((err) => {
            console.error(err);
        })
    }

    const handleShow = (value) => { //function untuk menampilkan modal beserta dengan data yg diselect
        setShowModal(true);
        setCartDetail(value);
        setJumlah(value.jumlah);
        setKeterangan(value.keterangan);
        setTotalHarga(value.total_harga);
    }

    const handleClose = () => { //function untuk menutup modal
        setShowModal(false)
    }

    const tambah = () => { //function untuk menambah jumlah (quantity) data api keranjangs
        setJumlah(jumlah + 1);
        setTotalHarga(cartDetail.product.harga * (jumlah + 1));
    }

    const kurang = () => { //function untuk mengurangi jumlah (quantity) data api keranjangs
        if(jumlah !== 1) {
            setJumlah(jumlah - 1)
            setTotalHarga(cartDetail.product.harga * (jumlah - 1));
        }
    }

    const changeHandler = (event) => { //function untuk mengubah state keterangan
       setKeterangan(event.target.value);
    }

    const handleSubmit = (event) => { //function untuk mengubah data yang ada pada modal

        event.preventDefault();
        handleClose();

        const data = {
            jumlah: jumlah,
            total_harga: totalHarga,
            product: cartDetail.product,
            keterangan: keterangan,
        }

        axios.put(API_URL + "keranjangs/" + cartDetail.id, data)
            .then((res) => {
                swal({
                    title: "Update pesanan",
                    text: data.product.nama + " berhasil update",
                    icon: "success",
                    button: false,
                    timer: 1500
                });
                getDataCarts();
            }).catch((err) => {
                console.log(err);
        }).finally(() => {
            getDataCarts();
        })
    }

    const hapus = (id) => { //function untuk menghapus data api keranjangs berdasarkan id
        handleClose();
        axios.delete(API_URL + "keranjangs/" + id)
            .then((res) => {
                swal({
                    title: "Hapus pesanan",
                    text: cartDetail.product.nama + " berhasil hapus",
                    icon: "error",
                    button: false,
                    timer: 1500
                });
                getDataCarts();
            }).catch((err) => {
            console.log(err);
        }).finally(()=> {
            getDataCarts();
        })
    }

    return (
        <>
            <Col md={3} className="mt-3">
                <h4><strong>Carts</strong></h4>
                <hr />
                {
                    carts.length !== 0 && (
                        <Card className="overflow-auto cart">
                            <ListGroup variant="flush">
                                {carts.map((cart) => (
                                    <ListGroup.Item key={cart.id}  style={{ cursor: 'pointer' }} onClick={() => handleShow(cart)}>
                                        <Row>
                                            <Col>
                                                <h4>
                                                    <Badge pill variant="success">
                                                        {cart.jumlah}
                                                    </Badge>
                                                </h4>
                                            </Col>
                                            <Col>
                                                <h5>{cart.product.nama}</h5>
                                                <span>Rp. {cart.product.harga}</span>
                                            </Col>
                                            <Col>
                                                <strong className="float-right">Rp. {cart.total_harga}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}

                                <ModalCart
                                    jumlah={jumlah}
                                    keterangan={keterangan}
                                    totalHarga={totalHarga}
                                    handleClose={handleClose}
                                    showModal={showModal}
                                    cartDetail={cartDetail}
                                    tambah={tambah}
                                    kurang={kurang}
                                    changeHandler={changeHandler}
                                    handleSubmit={handleSubmit}
                                    hapus={hapus}
                                />

                            </ListGroup>
                        </Card>
                    )
                }
            </Col>
        </>
    )
}

export default Carts;