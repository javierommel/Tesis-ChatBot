import React from 'react';
import { useState } from "react";
import CustomImageViewer from "./ImageViewer"
import ButtonMuseo from './ButtonMuseo';

export default function ComponentMuseo() {

    const [modal, setModal] = useState(false);

    const [imagenes, setImagenes] = useState([]);
    const [videos, setVideos] = useState([]);
    const [textos, setTextos] = useState([]);
    const [titulo, setTitulo] = useState("");

    const toggle = () => {
        setModal(!modal);
    }
    return (<>
        <ButtonMuseo onClick={toggle}>Mostrar Historia...</ButtonMuseo>
        {modal &&
            (
                <CustomImageViewer images={imagenes} videos={videos} textos={textos} titulo={titulo} toggle={toggle} />
            )}
    </>
    );
}
