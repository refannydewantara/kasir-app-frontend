import React from "react";
import { Image, Button } from "react-bootstrap";
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className="mt-4 text-center">
            <h2>Halaman tidak ditemukan</h2>
            <Button variant="primary" as={Link} to="/"> Kembali</Button>
        </div>
    )
}

export default NotFound;