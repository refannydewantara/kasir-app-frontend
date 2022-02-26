import {Form, Modal, Button} from "react-bootstrap";
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalCart = ({
    showModal,
    handleClose,
    cartDetail,
    jumlah,
    keterangan,
    tambah,
    kurang,
    changeHandler,
    handleSubmit,
    totalHarga,
    hapus
    }) => {

    if(cartDetail) {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {cartDetail.product.nama} {" "}
                        <strong>
                            (Rp. {cartDetail.product.harga})
                        </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Total harga: </Form.Label>
                            <p>
                                <strong>
                                    Rp. {totalHarga}
                                </strong>
                            </p>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Jumlah: </Form.Label>
                            <br/>
                            <Button variant="primary" size="sm" className="mr-2" onClick={() => kurang()}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            <strong>
                               {jumlah}
                            </strong> {" "}
                            <Button variant="primary" size="sm" className="mr-2" onClick={() => tambah()}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Keterangan: </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                name="keterangan"
                                placeholder="Nasi goreng, pake bakso"
                                value={keterangan}
                                onChange={(event) => changeHandler(event)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Simpan
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => hapus(cartDetail.id)}>
                        <FontAwesomeIcon icon={faTrash}/> Hapus pesanan
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    } else {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Kosong</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Kosong
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default  ModalCart;