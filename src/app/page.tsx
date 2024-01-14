"use client"

import { useState } from "react";
import { PhotoItem } from "../components/PhotoItem";
import { photoList } from "../data/photoList";
import { Modal } from "../components/Modal";
import { Photo } from "../types/Photo";

const Page = () => {

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState<Photo>({id: 0, fileName: ''});

  const openModal = (id: number) => {
    const photo = photoList.find(item => item.id === id);
    if (photo) {
      setModalImage({...photo});
      setShowModal(true);
    }
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const nextModal = (modalImage: Photo) => {
    const nextId = modalImage.id + 1
    const photo = photoList.find(item => item.id === nextId)
    if(photo){
      setModalImage({...photo})
    } else {
      const firstPhoto = photoList[0];
      setModalImage({...firstPhoto})
    }
  }

  const previousModal = (modalImage: Photo) => {
    const nextId = modalImage.id - 1
    const photo = photoList.find(item => item.id === nextId)
    if(photo){
      setModalImage({...photo})
    } else {
      const lastPhoto = photoList[photoList.length - 1]
      setModalImage({...lastPhoto})
    }
  }

  return (
    <div className="mx-2">
      <h1 className="text-center text-3xl font-bold my-10">Fotos Intergaláticas</h1>
      <section className="container max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {photoList.map(item =>
          <div key={item.id}>
            <PhotoItem
              key={item.id}
              photo={item}
              onClick={() => openModal(item.id) } />
          </div>
        )}
      </section>

      {showModal &&
        <Modal 
        image={modalImage.fileName} 
        closeModal={closeModal} 
        nextModal={() => nextModal (modalImage)} 
        previousModal={() => previousModal(modalImage)} />
      }

    </div>
  );
}

export default Page;