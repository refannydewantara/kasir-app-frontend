import React from "react";
import { Image, Button } from "react-bootstrap";
import {Link} from "react-router-dom";

const Success = () => {
    return (
        <div className="mt-4 text-center">
            <Image src="assets/images/sukses.png" width="500"/>
            <h2>Sukses Pesan</h2>
            <span>Terimakasih sudah memesan</span>
            <Button variant="primary" as={Link} to="/"> Kembali</Button>
        </div>
    )
}

export default Success;