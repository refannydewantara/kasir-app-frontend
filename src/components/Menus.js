import {Card, Col} from "react-bootstrap";

const Menus = ({menu, masukKeranjang}) => {
    return (
        <Col md={4} xs={6} className="mb-4">
            <Card className="shadow" >
                <Card.Img
                    variant="top"
                    src={"assets/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar}/>
                <Card.Body>
                    <Card.Title>{menu.nama}<strong>({menu.kode})</strong></Card.Title>
                    <Card.Text>Rp. {menu.harga}</Card.Text>
                    <Card.Text style={{ float: "right", color: "blue", cursor: "pointer" }} onClick={() => masukKeranjang(menu)
                    }>Add to Cart</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Menus;